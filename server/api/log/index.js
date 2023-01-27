import prisma from "~~/server/lib/db"


export default defineEventHandler(async (event) => {
    console.error('sono dentro log!')
    return prisma.log.findMany({
        include: { source: true },
        take: 100
    })
})
