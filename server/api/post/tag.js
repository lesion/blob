import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()


export default async (req, res) => {
  const query = useQuery(req)
  if (query.id) {
    const id = Number(query.id)
    const maxPosts = Number(query.maxPosts) || 10
    
    return prisma.post.findMany({
      orderBy: [ { date: 'desc'} ],
      take: maxPosts,
      where: { tags: { some: { id } } },
      include: {
        tags: true,
        source: true
      }
    })
  }
}  