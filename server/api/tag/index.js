import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import { useQuery } from 'h3'

export default async (req, res) => {
  const ret = useQuery(req)
  const id = Number(ret.id)
  if (id) {
    return prisma.tag.findUnique({ where: { id }})
  }
  return prisma.tag.findMany({ where: { name: { contains: ret?.search } } })
}
