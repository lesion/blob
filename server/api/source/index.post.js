import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

import { getFeedDetails } from '~~/server/helper'

export default defineEventHandler(async (event) => {
  const { URL } = await readBody(event)
  // check if URL already exists
  // let dbsource = await prisma.source.findFirst( {
  //   where: { URL },
  //   include: { 
  //     _count: {
  //       select: { posts: true }
  //     }
  //   }
  // })

  // if (dbsource) return dbsource
  let source
  // console.error(URL)
  try {
    source = await getFeedDetails(URL)
  } catch (e) {
    sendError(event, createError({ statusCode: 400, statusMessage: e.message }))
  }
  if (!source) {
    return createError({ statusCode: 404 })
  }
  // dbsource = await prisma.source.findFirst( {
  //   where: { URL: source.URL },
  //   include: { 
  //     _count: {
  //       select: { posts: true }
  //     }
  //   }
  // })
  // if (dbsource) return dbsource
  const data = {
    name: source.title || '',
    description: source.description || '',
    URL: source.URL,
    link: source.link,
    updatedAt: source.date || undefined,
    // image: source.image
  }
  console.error(data)
  return prisma.source.create({ data })
    .catch(e => {
      console.error(e)
      sendError(event, createError({ statusCode: 401, statusMessage: 'ciao' }))
    })
})
