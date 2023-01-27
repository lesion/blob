import prisma from "~~/server/lib/db"

export default defineEventHandler(async (event) => {
  let { blobId, sources, tags, inclusive } = await readBody(event)
  tags = tags.map(tagId => ({ id: tagId }))
  sources = sources.map(sourceId => ({ id: sourceId }))
  return prisma.filter.create({
    data: { blobId, inclusive, tags: { connect: tags }, sources: { connect: sources } },
    include: { tags: true, sources: true } })
})
