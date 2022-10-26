import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { blobId, sourceId, tagId } = await readBody(event)
  return prisma.filter.create({ data: { sourceId, blobId, tagId }})
})
