import prisma from '../../lib/db.mjs'

// logical Post deletion
export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  if (!id) {
    return sendError(event, createError({ status: 404 }))
  }
  try {
    const post = await prisma.post.findFirst({ where: { id }})
    if (!post) {
      return sendError(event, createError({ status: 404 }))
    }

    // remove images
    if (post.image) {
      
    }
    await prisma.post.delete( { where: { id } })
  } catch (e) {
    return sendError(event, createError({ status: 404 }))
  }

  return true

})