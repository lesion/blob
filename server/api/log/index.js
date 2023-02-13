import prisma from "~~/server/lib/db"


export default defineEventHandler(async (event) => {
    return prisma.log.findMany({
        include: { source: true },
        take: 100
    })
})
