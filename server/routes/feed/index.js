import { getLastPosts } from '@/server/lib/posts.mjs'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const feed = new RSS({
    title: 'Blob',
    site_url: config.public.baseURL,
    feed_url: `${config.public.baseURL}/feed`,
    generator: 'Blob 1.0'
  })

  const posts = await getLastPosts({})

  posts.forEach(post => {
    feed.item({
      title: post.title,
      url: post.URL,
      date: post.date,
      description: post.content || post.summary,
      enclosure: { url: `${config.public.baseURL}/media/${post.image}` },
      categories: post.tags_name?.split(',')
    })
  })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
}) 
