import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler((event) => {
  const { query } = getQuery(event)
  if (query) {
    return prisma.tag.findMany({ where: { name: { contains: query } } })  
  } else {
    return prisma.tag.findMany()
  }
})
