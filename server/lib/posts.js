import prisma from './db.js'

export function getLastPosts () {
    return prisma.post.findMany({ 
        take: 10,
        orderBy: { date: 'desc' },
        include: { tags: true, source: true  }
    })
}