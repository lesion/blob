import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  if (id) {
    // await prisma.blob.deleteMany({ where: { sourceId: id } })
    return prisma.source.delete({ where: { id }})
  } else {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Not found' }))

  }
})