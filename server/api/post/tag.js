import prisma from '~~/server/lib/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (query.id) {
    const id = Number(query.id)
    const maxPosts = Number(query.maxPosts) || 10
    
    const tag = await prisma.tag.findUnique({ where: { id }})
    
    if (!tag) {
      return createError({ status: 404 })
    }

    const posts = await prisma.post.findMany({
      orderBy: [ { date: 'desc'} ],
      take: maxPosts,
      where: { tags: { some: { id } } },
      include: {
        tags: true,
        source: true
      }
    })

    return { tag, posts }
  }
})