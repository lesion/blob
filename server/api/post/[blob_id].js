import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const id = Number(event.context.params.blob_id)
  const query = getQuery(event)
  const maxPosts = Number(query.maxPosts) || 10

  const blob = await prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { id : true } }, tags: { select: { id: true }}} } } })
  console.error(blob)
  if (!id || !blob || !blob.Filter) return sendError(event, createError({ status: 404 }))

  await prisma.blob.update({ where: { id }, data: { dailyView: { increment: 1 } } })

  const filters = blob.Filter.map(filter => {
    let f = `(p.sourceId in (${filter.sources.map(s => s.id)})) `
    if (filter.tags) {
      f += `AND SUM(pt.B in (${filter.tags.map(t => t.id)})) = ${filter.tags.length}`
    }
    return f
  }).join(' OR ')

  // console.error(`SELECT * FROM Post p
  //   LEFT JOIN _PostToTag pt on pt.A=p.id
  //   LEFT JOIN Source s on s.id=p.sourceId
  //   GROUP BY p.id
    // HAVING ${filters}`)
  const posts = await prisma.$queryRawUnsafe(`SELECT title, p.URL, summary, date, sourceId, s.name, link, description, p.image FROM Post p
    LEFT JOIN _PostToTag pt on pt.A=p.id
    LEFT JOIN Source s on s.id=p.sourceId
    LEFT JOIN Tag t on t.id=pt.B
    GROUP BY p.id
    HAVING ${filters}`)
  // const posts = await prisma.post.groupBy({
  //   by: ['id'],
  //   orderBy: { date: 'desc' },
  //   take: maxPosts,
  //   having: {
  //     OR: blob.Filter.map(filter => {
  //       if (filter.tags.length) {
  //         return {
  //           sourceId: { in: filter.sources.map(s => s.id ) },
  //           AND: { _sum: { tags: { in: filter.tags.map(t => t.id) } } }
  //         }
  //       } else {
  //         return { sourceId: { in: filter.sources.map(s => s.id ) } }
  //       }
  //     })
  //   },
  //   include: {
  //     tags: true,
  //     source: true
  //   }
  // })
  console.error(posts)
  return posts.map(p => ({
    title: p.title,
    image: p.image,
    URL: p.URL,
    summary: p.summary,
    date: p.date,
    source: {
      id: p.sourceId,
      name: p.name,
      link: p.link,
      description: p.description
    },
    tags: []
  }))
})
