import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const { pin } = await readBody(event)
  if (id) {
    console.error('sono dentro put di blob e pin = ', pin, typeof pin)
    const blob = await prisma.blob.update({ where: { id }, data: { pin } })
    return blob
  } else {
    return sendError( createError({ statusCode: 404, statusMessage: 'Not found'}))
  }
})
