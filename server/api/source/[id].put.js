import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const { name } = await readBody(event)
  console.error(name)
  return prisma.source.update({ where: { id }, data: { name } })
})
