// import p from '@prisma/client'
// const { PrismaClient } = p
import fetch from 'node-fetch'
import FeedParser from 'feedparser'

// const prisma = new PrismaClient()

import { getParams, maybeTranslate, parseContent } from './helper.js'

// let fetch
// import('node-fetch').then(f => {
//   fetch = f
// })
// import fetch from 'node-fetch'
// const FeedParser = require('feedparser')

// // get('https://cavallette.noblogs.org/feed/atom')
const manager = {
  /**
   * check if post is new, updated or unknown
   * @param {Post} post 
   */
  async isPostNew (post) {
    // console.error(post.link)
    const ret = await prisma.post.findUnique({ where: { URL: post.link } })
    return !ret
  },
  isValid (post) {
    return true
  },
  async sourceError (err, source) {
    try {
      await prisma.source.update({ where: { id: source.id }, data: { status: 'WARNING', lastError: String(err) } })
    } catch (e) {
      console.error(source, e)
    }
  },
  async sourceCompleted (source) {
    try {
      await prisma.source.update({ where: { id: source.id }, data: { status: 'OK', lastError: null }})
    } catch(e) {
      console.error(source, e)
    }
  },
  async get (source) {
    try {

      // Get a response stream
      const res = await fetch(source.URL,
        { 
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml'
        })
    
      // Setup feedparser stream
      const feedparser = new FeedParser()
      feedparser.on('error', e => manager.sourceError(e, source))
      feedparser.on('end', e => manager.sourceCompleted(source))
      feedparser.on('readable', async () => {
        let post
        while(post = feedparser.read()) {
          // validate post
          if (!manager.isValid(post)) return

          // check if already exist and is not updated
          if (!await manager.isPostNew(post)) return
          try {

            // dompurify
            let { html, image } = parseContent(post.description || post.summary)
            // console.error(post.enclosures)
            const enclosuresImages = post.enclosures.filter(e => e.type.includes('image'))
            image = enclosuresImages.length ? enclosuresImages[0].url : image

            const data = {
              date: post.pubdate,
              title: post.title,
              URL:   post.link,
              content: html,
              image,
              summary: post.summary,
              source: { connect: { id: source.id } } 
            }

            if (post.categories.length) {
              data.tags = { connectOrCreate:
                  post.categories.map(name => ({
                    create: { name },
                    where: { name }
                  }))}
            }

            await prisma.post.create({ include: { tags: true }, data })

          } catch (e) { console.error(e) }
        }
      })
    
      // Handle our response and pipe it to feedparser
      if (res.status !== 200) throw new Error('Bad status code')
      const charset = getParams(res.headers.get('content-type') || '').charset
      let responseStream = res.body
      responseStream = maybeTranslate(responseStream, charset)
    
      // And boom goes the dynamite
      responseStream.pipe(feedparser)
      // res.body.pipe(feedparser)
    } catch (e) {
      // console.error('sono qui', e)
      manager.sourceError(e, source)
    }
  }
    
}


// const Queue = require('bull');
// import pkg from 'bullmq'
import Queue from 'bull'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
// import fetch from 'node-fetch'
// import FeedParser from 'feedparser'

const prisma = new PrismaClient()

// import { getParams, maybeTranslate } from './helpers.mjs'

let queue

export async function add (s) {
  queue.add(s, { jobId: s.id, repeat: { every: 100000 } })
  manager.get(s)
}

async function main () {
  queue = new Queue('foo6', { limiter: { max : 10, duration: 20000 } })
  queue.clean(1000)
  await queue.obliterate({ force: true });

  queue.process(job => manager.get(job.data))

  const sources = await prisma.source.findMany()
  // sources.forEach(manager.get)
  // manager.get()
  sources.forEach( s => queue.add(s, { jobId: s.id, repeat: { every: 100000 } }))
}


// main()
// manager.main()
