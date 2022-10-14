import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default async (req, res) => {
  // console.error(req.context.params.id)
  // const id = Number(req.context.params.id)
  // return prisma.cohort.findUnique({ where: { id }, include: { Filter: { include: { source: { select: { name: true } }, tag: { select: { name: true } } } } } })
  // return prisma.cohort.findMany({ take: 20, include: { Filter: { include: { source: { select: { link: true, description: true, name: true } }, tag: { select: { name: true } } } } } })
  const id = Number(req.context.params.id)
  const maxPosts = 10 // Number(query.maxPosts) || 10

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
