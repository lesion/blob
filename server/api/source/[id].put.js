import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const { name } = await readBody(event)
  if (id) {
    return prisma.source.update({ where: { id }, data: { name } })
  } else {
    return sendError( createError({ statusCode: 404, statusMessage: 'Not found'}))
  }
})
