import { getLastBlobPosts } from '@/server/lib/posts'
import RSS from 'rss'
import prisma from '../../lib/db.js'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  if (!id) {
    return sendError(event, createError({ status: 404 }))
  }
  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { id : true } }, tags: { select: { id: true }}} } } })
  if (!blob || !blob.Filter) return sendError(event, createError({ status: 404 }))

  const config = useRuntimeConfig()

  const feed = new RSS({
    title: blob.name,
    site_url: config.public.baseURL,
    feed_url: `${config.public.baseURL}/feed/${id}`,
    generator: 'Blob 1.0'
  })

  const posts = await getLastBlobPosts(blob)

  console.error(posts, id)
  posts.forEach(post => {
    feed.item({
      title: post.title,
      url: post.URL,
      date: post.date,
      summary: post.summary,
      enclosure: { url: `${config.public.baseURL}/media/${post.image}` },
      categories: post.tags_name.split(',')
    })
  })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
}) 