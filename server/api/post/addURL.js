// import queue from "~~/worker/queue.mjs"
import { getPostFromURL } from '../../helper.js'
// import { addPost } from '~~/server/lib/posts'

export default defineEventHandler(async event => {
  const { URL, tags } = await readBody(event)
  if (!URL) return sendError(404)
  console.error(tags)
  const post = await getPostFromURL(URL, tags, false)
  return post
  // console.error(post)
  // return addPost(post)
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
