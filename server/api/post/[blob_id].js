import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const id = Number(event.context.params.blob_id)
  const query = getQuery(event)
  const maxPosts = Number(query.maxPosts) || 10

  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: true } })
  console.error(blob)
  if (!id || !blob || !blob.Filter) return sendError(event, createError({ status: 404 }))

  await prisma.blob.update({ where: { id }, data: { dailyView: { increment: 1 } } })
  return prisma.post.findMany({
    orderBy: [{ date: 'desc' }],
    take: maxPosts,
    where: {
      OR: blob.Filter.map(filter => {
        if (filter.tagId) {
          return { sourceId: filter.sourceId, tags: { some: { id: filter.tagId } } }
        } else {
          return { sourceId: filter.sourceId }
        }
      })
    },
    include: {
      tags: true,
      source: true
    }
  })
})
