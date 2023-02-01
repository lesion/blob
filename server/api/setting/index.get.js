import prisma from "~~/server/lib/db"

export default defineEventHandler((event) => {
    return prisma.setting.findMany()
})