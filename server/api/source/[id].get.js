import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(event => {
  const id = Number(event.context.params.id)
  return prisma.source.findUnique({ where: { id } })
})
