import prisma from "~~/server/lib/db"


export default defineEventHandler(async (event) => {
    return prisma.log.findMany({
        // include: { source: true },
        orderBy: [{ createdAt: 'desc' }],
        take: 100
    })
})
