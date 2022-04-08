import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import { useQuery } from 'h3'

export default async (req, res) => {
  const { search } = useQuery(req)
  return prisma.tag.findMany({ where: { name: { contains: search } } })
}
