import prisma from './db.mjs'

export async function findSource (sourceURL) {
    const ret = await prisma.source.findMany({ where: { } })
}