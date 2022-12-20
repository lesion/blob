import prisma from "~~/server/lib/db"

export default defineEventHandler((event) => {
  const { query } = getQuery(event)
  if (query) {
    return prisma.tag.findMany({ where: { name: { contains: query } } })  
  } else {
    return prisma.tag.findMany()
  }
})
