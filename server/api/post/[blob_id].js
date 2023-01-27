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


  // OK THIS IS AN HACK!
  const filters = blob.Filter.map(filter => {
    let f = `(p.sourceId in (${filter.sources.map(s => s.id)}) `
    if (filter.tags) {
      if (filter.inclusive) {
        f += `AND SUM(pt.B in (${filter.tags.map(t => t.id)})) = ${filter.tags.length})`
      } else {
        f += `AND SUM(pt.B in (${filter.tags.map(t => t.id)})))`
      }
    }
    return f
  }).join(' OR ')

  const q = `SELECT title, p.URL, summary, date, sourceId, s.name, link, description, p.image, GROUP_CONCAT(t.name) tags_name, GROUP_CONCAT(t.id) tags_id FROM Post p
    LEFT JOIN _PostToTag pt on pt.A=p.id
    LEFT JOIN Source s on s.id=p.sourceId
    LEFT JOIN Tag t on t.id=pt.B
    GROUP BY p.id
    HAVING ${filters} LIMIT ${maxPosts}`

  const posts = await prisma.$queryRawUnsafe(q)

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
    tags: p.tags_name.split(',').map((name, idx) => ({ id: p.tags_id.split(',')[idx], name }))
  }))
})
