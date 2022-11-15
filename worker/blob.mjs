#!/bin/env node
import fetch from 'node-fetch'
import FeedParser from 'feedparser'

import pkg from '@prisma/client'
const { PrismaClient } = pkg;


const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' }
  ]
})

prisma.$on('warn', (e) => {
  console.log(e)
})

prisma.$on('info', (e) => {
  console.log(e)
})

prisma.$on('error', (e) => {
  console.log(e)
})

import { getParams, maybeTranslate, parseContent } from './helper.mjs'

// // get('https://cavallette.noblogs.org/feed/atom')
const manager = {
  /**
   * check if post is new, updated or unknown
   * @param {Post} post 
   */
  async isPostNew(post) {
    // console.error(post.link)
    const ret = await prisma.post.findUnique({ where: { URL: post.link } })
    return !ret
  },
  isValid(post) {
    return true
  },
  async sourceError(err, source) {
    try {
      await prisma.source.update({ where: { id: source.id }, data: { status: 'WARNING', lastError: String(err) } })
    } catch (e) {
      console.error(source, e)
    }
  },
  async sourceCompleted(source) {
    try {
      await prisma.source.update({ where: { id: source.id }, data: { status: 'OK', lastError: null } })
    } catch (e) {
      console.error(source, e)
    }
  },
  async get(source) {
    try {

      // Get a response stream
      const res = await fetch(source.URL,
        {
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml',
          'If-Modified-Since': source.updatedAt.toGMTString(),
        })

      // Setup feedparser stream
      const feedparser = new FeedParser()
      feedparser.on('error', e => manager.sourceError(e, source))
      feedparser.on('end', () => manager.sourceCompleted(source))
      feedparser.on('readable', async () => {
        let post
        while (post = feedparser.read()) {
          // validate post
          if (!manager.isValid(post)) return

          // check if already exist and is not updated
          if (!await manager.isPostNew(post)) return
          try {

            // dompurify
            let { html, image } = parseContent(post.description || post.summary, new URL(source.link).origin)
            // console.error(post.enclosures)
            const enclosuresImages = post.enclosures.filter(e => e.type.includes('image'))
            image = enclosuresImages.length ? enclosuresImages[0].url : image

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
                    create: { name },
                    where: { name }
                  }))
              }
            }

            await prisma.post.create({ include: { tags: true }, data })

          } catch (e) { console.error(e) }
        }
      })

      // Handle our response and pipe it to feedparser
      if (res.status !== 200) throw new Error(`Bad status code ${res.status}`)
      const charset = getParams(res.headers.get('content-type') || '').charset
      let responseStream = res.body
      responseStream = maybeTranslate(responseStream, charset)

      // And boom goes the dynamite
      responseStream.pipe(feedparser)
    } catch (e) {
      // console.error('sono qui', e)
      manager.sourceError(e, source)
    }
  }

}


import Queue from 'bull'
let queue

async function main() {

  try {
    await prisma.$connect()
  } catch (e) {
    console.error(e)
    process.exit(-1)
  }


  queue = new Queue('foo6', { limiter: { max: 5, duration: 1000 } })

  queue.on('error', err => {
    console.error("\r\n  = Could not connect to redis database! Please install and enable it. \r\n\r\n", err)
    process.exit(-1)
  })

  await queue.isReady()
  console.error('Connected to redis')
  await queue.clean(1000)
  await queue.obliterate({ force: true });

  queue.process(job => {
    console.error('PROCESS! ', job.data.name)
    manager.get(job.data)
  })

  const sources = await prisma.source.findMany()
  console.error(`Found ${sources.length} sources`)
  sources.forEach(s => queue.add(s))
  sources.forEach(s => queue.add(s, { jobId: s.id, repeat: { every: 100000 } }))
}


main()
// manager.main()
