import { useQuery } from 'h3'

import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default async (req, res) => {
  const query = useQuery(req)
  if (query.id) {
    const id = Number(query.id)
    await prisma.filter.deleteMany({ where: { cohortId: id } })
    return prisma.cohort.delete({ where: { id }})
  }
}