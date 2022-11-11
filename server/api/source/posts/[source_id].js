import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const sourceId = Number(event.context.params.source_id)
  const { maxPosts } = useQuery(event)

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
