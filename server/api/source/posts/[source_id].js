import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const sourceId = Number(event.context.params.source_id)
  const { after, maxPosts = 10 } = getQuery(event)
  const where = { sourceId }

  if (after) {
    where['date'] = { lt: after }
  }

  return prisma.post.findMany({
    orderBy: [{ date: 'desc' }],
    take: maxPosts,
    where,
    include: {
      tags: true,
      source: true
    }
  })
})
