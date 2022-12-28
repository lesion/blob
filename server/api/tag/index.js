import prisma from "~~/server/lib/db"

export default defineEventHandler((event) => {
  const { query, sources } = getQuery(event)
  if (query) {
    return prisma.tag.findMany({ where: { name: { contains: query }, posts: { some: { sourceId: { in: sources.split(',').map(Number) }}} } })  
  } else {
    return prisma.tag.findMany({ where: { posts: { some: { sourceId: { in: sources.split(',').map(Number) }}} } })
  }
})
