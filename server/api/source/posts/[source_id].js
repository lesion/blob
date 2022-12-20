import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const sourceId = Number(event.context.params.source_id)
  const { maxPosts } = getQuery(event)

  return prisma.post.findMany({
    orderBy: [{ date: 'desc' }],
    take: maxPosts,
    where: { sourceId },
    include: {
      tags: true,
      source: true
    }
  })
})
