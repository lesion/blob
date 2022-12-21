import prisma from "~~/server/lib/db"

export default defineEventHandler(async (event) => {
  const { blobId, sourceId, tagId } = await readBody(event)
  return prisma.filter.create({ data: { sourceId, blobId, tagId }, include: { source: true } })
})
