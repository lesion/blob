import { useBody, createError } from 'h3'
import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

import { getFeedDetails } from '~~/server/helper'

export default async (req, res) => {
  const { URL } = await useBody(req)

  // check if URL already exists
  let dbsource = await prisma.source.findFirst( {
    where: { URL },
    include: { 
      _count: {
        select: { posts: true }
      }
    }
  })

  if (dbsource) return dbsource
  let source
  try {
    source = await getFeedDetails(URL)
  } catch (e) {
    return createError("diocane")
  }

  if (!source) {
    return res.sendStatus(404)
  }
  dbsource = await prisma.source.findFirst( {
    where: { URL: source.URL },
    include: { 
      _count: {
        select: { posts: true }
      }
    }
  })
  if (dbsource) return dbsource
  return prisma.source.create({ data: {
    name: source.title,
    description: source.description,
    URL: source.URL,
    link: source.link,
    updatedAt: source.date || undefined,
    // image: source.image
  }})

}