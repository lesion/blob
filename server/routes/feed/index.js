import { getLastPosts } from '@/server/lib/posts.mjs'
import { getSettings } from '../../lib/settings.js'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const settings = await getSettings()

  const feed = new RSS({
    title: settings.name,
    description: settings.about,
    site_url: config.public.baseURL,
    feed_url: `${config.public.baseURL}/feed`,
    image_url: `${config.public.baseURL}/media/logo`,
    generator: 'Blob 1.0'
  })

  const posts = await getLastPosts({})

  posts.forEach(post => {
    feed.item({
      title: post.title,
      url: post.URL,
      date: post.date,
      description: post.content || post.summary,
      author: post.source.name,
      enclosure: { url: `${config.public.baseURL}/media/${post.image}` },
      categories: post.tags_name?.split(',')
    })
  })
  event.res.setHeader('content-type', 'text/xml; charset=utf-8')
  event.res.end(feed.xml({ indent: true }))
}) 
