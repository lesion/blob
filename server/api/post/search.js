import prisma from "~~/server/lib/db"

export default defineEventHandler(async event => {
  const { query } = getQuery(event)
  console.error('sono dentro qui e cerco ', query)
  return prisma.post.findMany({ where: {
    OR: [
      { title: { contains: query } },
      { summary: { contains: query } },
      { URL: { contains: query } }
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