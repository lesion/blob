import { useQuery } from 'h3'
import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default function (req) {
  const { search } = useQuery(req)
  return prisma.source.findMany({ where: {
    OR: [
      { name: { contains: search } },
      { description: { contains: search } },
      { URL: { contains: search } }
    ]
  }})  
}


//app.get('/search', async (req, res) => {
  //const search = req.query.search || ''
  //const sources = await prisma.source.findMany({ where: {
    //OR: [
      //{ name: { contains: search } },
      //{ description: { contains: search } },
      //{ URL: { contains: search } }
    //]
  //}})
  //return res.json(sources)
//})