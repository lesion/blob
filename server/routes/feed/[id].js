import { getPosts } from '../../controller/blob.js'
import RSS from 'rss'

export default defineEventHandler(async (event) => {

  const id = Number(event.context.params.id)

  const feed = new RSS({
    title: 'cia',
    site_url: process.env.BASE_URL,
    feed_url: `${process.env.BASE_URL}/feed/${id}`,
    generator: 'Blob'
  })

  const posts = await getPosts(id)
  posts.forEach(post => {
    feed.item({
      title: post.title,
      url: post.URL,
      date: post.date,
      summary: post.summary,
      enclosure: { url: post.image }
    })
  })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
})