import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const { pin } = getQuery(event)

  return prisma.blob.findMany(
    {
      take: 20,
      where: {
        ...( pin && { pin: true })
      },
      orderBy: { ord: 'asc' },
      include: {
        Filter: {
          include: {
            sources: { select: { link: true, description: true, name: true } },
            tags: { select: { name: true } }
          }
        }
      }
    })})
    