import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event)
  return prisma.source.findMany({ where: { name: { contains: search } } })
})
