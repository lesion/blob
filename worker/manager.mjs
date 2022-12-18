import fetch from 'node-fetch'
import FeedParser from 'feedparser'

import { getParams, maybeTranslate, parseContent, getPostImage } from './helper.mjs'

import db from './db.mjs'

// // get('https://cavallette.noblogs.org/feed/atom')
const manager = {

  isValid(post) {
    return true
  },


  async get (job) {
    const sourceId = job.data

    const source = await db.getSource(sourceId)

    console.error(`PROCESS  ${source.name} - ${source.URL} - ${source.updatedAt} - ${source.ETag}`)
    try {

      // Get a response stream
      const res = await fetch(source.URL,
        {
          headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml',
            ...(source.updatedAt && {'If-Modified-Since': source.updatedAt.toGMTString() }),
            ...(source.ETag && {'If-None-Match': source.ETag})
          }
        })

      // Setup feedparser stream
      const feedparser = new FeedParser()
      feedparser.on('error', e => db.sourceError(e, source, res))
      feedparser.on('end', () => db.sourceCompleted(source, res))
      feedparser.on('readable', async () => {
        let post
        while (post = feedparser.read()) {
          // validate post
          if (!manager.isValid(post)) return
          
          // check if already exist and is not updated
          if (!await db.isPostNew(post)) return
          try {

            // retrieve image from original url
            let image = await getPostImage(post.link)

            // dompurify
            let { html, image: fallbackImage } = parseContent(post.description || post.summary, new URL(source.link || source.URL).origin)
            // console.error(post.enclosures)
            const enclosuresImages = post.enclosures.filter(e => e.type.includes('image'))
            if (!image) {
              image = enclosuresImages.length ? enclosuresImages[0].url : fallbackImage
            }

            const data = {
              date: post.pubdate,
              title: post.title,
              URL: post.link,
              content: html,
              image,
              summary: post.summary,
              source: { connect: { id: source.id } }
            }

            if (post.categories.length) {
              data.tags = {
                connectOrCreate:
                  post.categories.map(name => ({
                    where: { name },
                    create: { name }
                  }))
              }
            }

            await db.createPost({ include: { tags: true }, data })

          } catch (e) { console.error('catch', e) }
        }
      })

      // Handle our response and pipe it to feedparser
      if (res.status !== 200) {
        console.error(`Skip parsing with ${res.status} status code`)
        return
      }

      const charset = getParams(res.headers.get('content-type') || '').charset
      let responseStream = res.body
      responseStream = maybeTranslate(responseStream, charset)

      // And boom goes the dynamite
      responseStream.pipe(feedparser)
    } catch (e) {
      manager.sourceError(e, source)
    }
  }

}

export default manager