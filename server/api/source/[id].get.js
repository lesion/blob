import prisma from "~~/server/lib/db"

export default defineEventHandler(event => {
  const id = Number(event.context.params.id)
  return prisma.source.findUnique({ where: { id } })
})
