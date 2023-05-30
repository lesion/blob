// import queue from "~~/worker/queue.mjs"
import { getPostFromURL } from '../../helper.js'


export default defineEventHandler(async event => {
  const { URL } = await readBody(event)
  if (!URL) return sendError(404)
  return getPostFromURL(URL, [], true)
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
