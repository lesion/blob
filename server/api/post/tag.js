import prisma from '~~/server/lib/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (query.id) {
    const id = Number(query.id)
    const maxPosts = Number(query.maxPosts) || 10
    const after = (query.after)
    
    const tag = await prisma.tag.findUnique({ where: { id }})

    if (!tag) {
      return createError({ status: 404 })
    }

    const where = { 
      tags: { some: { id } },
    }
    
    if (!event.context?.auth?.user) {
      where['visible'] =  true
    }
    if (after) {
      where['date'] = { lt: new Date(after) }
    }


    const posts = await prisma.post.findMany({
      orderBy: [ { date: 'desc'} ],
      take: maxPosts,
      where,
      include: {
        tags: true,
        source: true
      }
    })

    return { tag, posts }
  }
})