import { useBody } from 'h3'

import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default async (req, res) => {
  const { cohortId, sourceId, tagId } = await useBody(req)
return prisma.filter.create({ data: { sourceId, cohortId, tagId }})
}
