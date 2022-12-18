import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getPosts = async id => {
  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: true } })
  if (!id || !blob || !blob.Filter) throw new Error('Not found') 
  // return sendError(event, createError({ status: 404 }))

  await prisma.blob.update({ where: { id }, data: { dailyView: { increment: 1 } } })
  const posts = await prisma.post.findMany({
    orderBy: [{ date: 'desc' }],
    take: 10,
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
  return posts.map(p => { delete p.content; return p })  
}