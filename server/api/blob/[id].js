import prisma from "~~/server/lib/db"

export default defineEventHandler(event => {
  const id = Number(event.context.params.id)
  if (id) {
    return prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { name: true } }, tags: { select: { name: true } } } } } })
  } else {
    return sendError( createError({ statusCode: 404, statusMessage: 'Not found'}))
  }
})
