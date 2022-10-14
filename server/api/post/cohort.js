import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default async (req, res) => {
  const query = useQuery(req)
  if (query.id) {
    const id = Number(query.id)
    const maxPosts = Number(query.maxPosts) || 10

    const cohort = await prisma.cohort.findUnique({ where: { id }, include: { Filter: true } })
    if (!id || !cohort || !cohort.Filter) return res.sendStatus(404)

    await prisma.cohort.update({ where: { id }, data: { dailyView: { increment: 1 } } })
    return prisma.post.findMany({
      orderBy: [{ date: 'desc' }],
      take: maxPosts,
      where: {
        OR: cohort.Filter.map(filter => {
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
  }
}  
