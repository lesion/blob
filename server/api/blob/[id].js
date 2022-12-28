import prisma from "~~/server/lib/db"

export default defineEventHandler(event => {
  const id = Number(event.context.params.id)
  return prisma.blob.findUnique({ where: { id }, include: { Filter: { include: { sources: { select: { name: true } }, tags: { select: { name: true } } } } } })
})
