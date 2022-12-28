import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const id = Number(event.context.params.blob_id)
  const query = getQuery(event)
  const maxPosts = Number(query.maxPosts) || 10

  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { id : true } }, tags: { select: { id: true }}} } } })
  console.error(blob)
  if (!id || !blob || !blob.Filter) return sendError(event, createError({ status: 404 }))

  await prisma.blob.update({ where: { id }, data: { dailyView: { increment: 1 } } })
  const posts = await prisma.post.findMany({
    orderBy: [{ date: 'desc' }],
    take: maxPosts,
    where: {
      OR: blob.Filter.map(filter => {
        if (filter.tags.length) {
          return { sourceId: { in: filter.sources.map(s => s.id ) }, tags: { some: { id: { in: filter.tags.map(t => t.id) } }  } }
        } else {
          return { sourceId: { in: filter.sources.map(s => s.id ) } }
        }
      })
    },
    include: {
      tags: true,
      source: true
    }
  })
  return posts.map(p => { delete p.content; return p })
})
