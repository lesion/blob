import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()
import { useQuery } from 'h3'

export default function (req, res) {
  const query = useQuery(req)
  const id = Number(query.id)
  if (id) {
    return prisma.post.findUnique({ where: { id }})
  } else {
    return prisma.post.findMany({ take: 10, orderBy: { date: 'desc' }, include: { tags: true, source: true  }})
  }
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
