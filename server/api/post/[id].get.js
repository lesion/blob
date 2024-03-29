import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import { getLastBlobPosts } from '../../lib/posts.mjs'

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const { after } = getQuery(event)
  if (!id) {
    return sendError(event, createError({ status: 404 }))
  }
  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { id : true } }, tags: { select: { id: true }}} } } })
  if (!blob.Filter) return sendError(event, createError({ status: 404 }))

  await prisma.blob.update({ where: { id }, data: { dailyView: { increment: 1 } } })

  const posts = await getLastBlobPosts(blob, { after, visibleOnly: !event.context?.auth?.user })

  return posts.map(p => ({
    id: p.id,
    title: p.title,
    image: p.image,
    URL: p.URL,
    summary: p.summary,
    visible: p.visible,
    date: p.date,
    source: {
      id: p.sourceId,
      name: p.name,
      link: p.link,
      description: p.description
    },
    tags: p.tags_name?.split(',').map((name, idx) => ({ id: p.tags_id.split(',')[idx], name }))
  }))
})
