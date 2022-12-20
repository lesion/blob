import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const { search } = getQuery(event)
  return prisma.source.findMany({ where: {
    OR: [
      { name: { contains: search } },
      { description: { contains: search } },
      { URL: { contains: search } }
    ]
  }})  
})


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