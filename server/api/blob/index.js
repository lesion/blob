import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

export default defineEventHandler(() => prisma.blob.findMany(
  {
    take: 20,
    include: {
      Filter: {
        include: {
          source: { select: { link: true, description: true, name: true } },
          tag: { select: { name: true } }
        }
      }
    }
  }))
