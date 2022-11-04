
import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  if (id) {
    return prisma.filter.delete({ where: { id } })
  }
})
