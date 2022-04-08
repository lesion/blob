import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import { useQuery } from 'h3'

export default async (req, res) => {
  const { search } = useQuery(req)
  return prisma.source.findMany({ where: { name: { contains: search } } })
}
