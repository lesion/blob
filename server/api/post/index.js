import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler(event => {
  const query = useQuery(event)
  const id = Number(query.id)
  if (id) {
    return prisma.post.findUnique({ where: { id }})
  } else {
    return prisma.post.findMany({ 
      take: 10,
      orderBy: { date: 'desc' },
      include: { tags: true, source: true  }})
  }
})
