import fetch from 'node-fetch'
import FeedParser from 'feedparser'

import { getParams, maybeTranslate, getPostImageURL, sanitizeHTMLContent,
  sanitizeHTMLSummary, findFirstImageURL, retrieveImage, createPostFromURL } from './helper.mjs'

import db from './db.mjs'
import queue from './queue.mjs'

const manager = {

  isValid(post) {
    return true
  },

  
  // task manager
  async get (job) {
    const taskData = job.data

    console.error('dentro il manager', taskData)
    
    if (taskData.type === 'url') {
      console.error('sono qui dentro task data type url')
      try {
        await createPostFromURL(taskData.postURL)
      } catch (e) {
        console.error(e)
      }
      return
    }


    const source = await db.getSource(taskData.sourceId)
    if (!source) {
      db.log({type: 'ERROR', message: `Source ${taskData}`} )
      queue.removeSource(taskData.sourceId)
      return
    }
    db.log({source, type: 'PROCESS', message: `URL: ${source.URL} - updatedAt: ${source.updatedAt} - ${source.ETag}` })
    try {

      // Get a response stream
      const res = await fetch(source.URL,
        {
          headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko)',
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
            db.log({source, type: 'NEW POST', message: post.title})

            // search for post image url from original url
            let imageURL = await getPostImageURL(post.link)

            // sanitize post content
            const contentHTML = sanitizeHTMLContent(post.description || post.summary)
            const summaryHTML = sanitizeHTMLSummary(post.summary || post.description)
            const fallbackImage = findFirstImageURL(contentHTML, new URL(source.link || source.URL).origin)

            // image is selected from metadata, if not found enclosure in feed and then the first image in the post is taken
            const enclosuresImages = post.enclosures.filter(e => e.type.includes('image'))
            if (!imageURL) {
              imageURL = enclosuresImages.length ? enclosuresImages[0].url : fallbackImage
            }

            if (imageURL) {
              imageURL = await retrieveImage(imageURL)
            }

            const data = {
              date: post.pubdate,
              title: post.title || '',
              URL: post.link,
              image: imageURL || null,
              content: contentHTML,
              summary: summaryHTML,
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

          } catch (e) {
            db.log({level: 'WARNING', type: 'ERROR', message: String(e) })
            continue
          }
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