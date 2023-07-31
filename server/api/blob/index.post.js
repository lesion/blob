
import pkg from '@prisma/client'
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {

  // check auth
  // console.error(event.context.auth)

  const { name, description } = await readBody(event)
  const blob = await prisma.blob.create({ data: { name, description } })
  await prisma.blob.update({ where: { id: blob.id }, data: { ord: blob.id }})
  return blob
})

//   // sources: {
//   //   connect: sources.map(id => ({ id }))
//   // }
//   async createFilter (req, res) {
//     const { cohortId, sourceId, tagId } = req.body
//     try {
//       const filter = await prisma.filter.create({ data: { sourceId, cohortId, tagId }})
//       return res.json(filter)
//     } catch (e) {
//       return res.status(400).send(String(e))
//     }
//   },

//   feed (cohort, posts) {
//     const feed = new Feed({
//       title: cohort.name,
//       description: cohort.description,
//       id: cohort.id,
//       // link: cohort.id,
//       generator: 'Chew'
//     })
//     posts.forEach(post => {
//       feed.addItem({
//         title: post.title,
//         id: post.URL,
//         link: post.URL,
//         description: post.summary,
//         content: post.content,
//         image: post.image,
//         date: post.updatedAt
//       })
//     })

//     return feed.atom1()

//   }
// }

// app.post('/', cohortController.create)
// app.post('/filter', cohortController.createFilter)

// app.get('/:id\.?:format(json|rss|atom|xml)?', cors(), async (req, res) => {
//   const format = req.params.format || 'json'
//   const id = Number(req.params.id)
//   const maxPosts = Number(req.query.maxPosts) || 10
//   console.error('id', id)
//   const cohort = await prisma.cohort.findUnique({ where: { id }, include: { Filter: true } })
//   if (!id || !cohort || !cohort.Filter) return res.sendStatus(404)

//   await prisma.cohort.update({ where: { id }, data: { dailyView: { increment: 1 } } })
//   const posts = await prisma.post.findMany({
//     orderBy: [ { date: 'desc'} ],
//     take: maxPosts,
//     where: {
//       OR: cohort.Filter.map(filter => {
//         if (filter.tagId) {
//           return { sourceId: filter.sourceId, tags: { some: { id: filter.tagId} }  }
//         } else {
//           return { sourceId: filter.sourceId }
//         }
//       })
//     },
//     include: {
//       tags: true,
//       source: true
//     }
//   })

//   const accept = accepts(req)
//   console.error(accept.types())

//   switch (format) {
//     case 'xml':
//     case 'rss':
//       return res
//         .contentType('application/rss+xml')
//         // .setHeader('Last-Modified', new Date(cohort.updatedAt).toUTCString())
//         // .set('ETag', Math.round(new Date(cohort.updatedAt).getTime() / 1000))
//         .send(cohortController.feed(cohort, posts))   
//     case 'json':
//     default:
//       return res.json({ cohort, posts })
//   }
// })



// // app.use((err, req, res, next) => {
// //     console.error('sono asodifaosdijf');
// //     console.error(err);
// //     res.status(500).json({error: 'an error occurred'});
// // });
//   // if (req.method === 'POST') {
//   //   return cohortController.create(req)
//   // }
// // }

// export default app