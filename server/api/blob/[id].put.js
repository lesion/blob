import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const { pin, name, description, sortBy, sortAsc } = await readBody(event)
  if (id) {
    return prisma.blob.update({ where: { id }, data: {
      [typeof pin !== 'undefined' && 'pin']: pin,
      [name && 'name']: name,
      [description && 'description']: description,
      [sortBy && 'sortBy']: sortBy,
      [typeof sortAsc !== 'undefined' && 'sortAsc']: sortAsc
    } })
  } else {
    return sendError( createError({ statusCode: 404, statusMessage: 'Not found'}))
  }
})
