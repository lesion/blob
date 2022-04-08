import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default async (_req, _res) => {
  return prisma.cohort.findMany({ take: 20 })
}
