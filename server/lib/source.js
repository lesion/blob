import prisma from './db.js'

export async function findSource (sourceURL) {
    const ret = await prisma.source.findMany({ where: { } })
}