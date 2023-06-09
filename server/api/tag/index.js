import prisma from "~~/server/lib/db"

export default defineEventHandler((event) => {
  const { query, sources, limit } = getQuery(event)
  if (query) {
    if (sources) {
      return prisma.tag.findMany({ take: 10, where: { name: { contains: query }, posts: { some: { sourceId: { in: sources.split(',').map(Number) }}} } })  
    } else {
      return prisma.tag.findMany({ take: 10, where: { name: { contains: query } } })  
    }
  } else if (sources) {
    return prisma.tag.findMany({ take: 10, where: { posts: { some: { sourceId: { in: sources.split(',').map(Number) }}} } })
  } else {
    return prisma.tag.findMany({ take: limit && Number(limit) })
  }
})
