import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

// TODO: by slug?
export default defineEventHandler(() => prisma.cohort.findMany(
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
