import prisma from '../../../lib/db.mjs'

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  
  if (!id) {
    return sendError(event, createError({ status: 404 }))
  }

  const data = await readBody(event)
  const post = await prisma.post.update({ where: { id }, data })
  if (!post) return sendError(event, createError({ status: 404 }))

  return post
})
