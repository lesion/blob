import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import { useQuery } from 'h3'

export default async (req, res) => {
  const query = useQuery(req)
  if (query.id) {
    const id = Number(query.id)
    return prisma.cohort.findUnique({ where: { id }, include: { Filter: { include: { source: { select: { name: true } }, tag: { select: { name: true } } } } } })
  } else {
    return prisma.cohort.findMany({ take: 20, include: { Filter: { include: { source: { select: { link: true, description: true, name: true } }, tag: { select: { name: true } } } } } })
  }
}
