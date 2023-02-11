import prisma from "~~/server/lib/db"

export default defineEventHandler(async (event) => {
  let { blobId, sources, tags, inclusive } = await readBody(event)

  // check 
  // tags = tags.map(tagId => ({ id: tagId }))
  tags = { connectOrCreate:
    tags.map(name => ({
      where: { name },
      create: { name }
    }))
    }
  sources = sources.map(sourceId => ({ id: sourceId }))
  return prisma.filter.create({
    data: { blobId, inclusive, tags, sources: { connect: sources } },
    include: { tags: true, sources: true } })
})
