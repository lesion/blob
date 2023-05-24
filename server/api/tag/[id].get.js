import prisma from "~~/server/lib/db"

export default defineEventHandler( event => {
    const id = Number(event.context.params.id)
    if (!id) {
        return sendError( event, createError( { status: 400, statusMessage: 'Not found' }))
    }

    return prisma.tag.findUnique({ where: { id } })

})