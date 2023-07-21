import prisma from '../../../lib/db.mjs'

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  if (!id) {
    return sendError(event, createError({ status: 404 }))
  }
  const post = await prisma.post.findUnique({ where: { id }})
  if (!post) return sendError(event, createError({ status: 404 }))
  return post
})
