import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export default defineEventHandler(() => prisma.source.findMany())


// const sourceController = {
//   feed (source, posts) {
//     const feed = new Feed({
//       title: source.name,
//       description: source.description,
//       id: source.id,
//       // link: source.id,
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
//         date: post.date
//       })
//     })

//     return feed.atom1()

//   }
// }

// app.get('/search', async (req, res) => {
//   const search = req.query.search || ''
//   const sources = await prisma.source.findMany({ where: {
//     OR: [
//       { name: { contains: search } },
//       { description: { contains: search } },
//       { URL: { contains: search } }
//     ]
//   }})
//   return res.json(sources)
// })
// const corsOptions = { exposedHeaders: ['Accept-Language',
// 'Access-Control-Allow-Origin',
// 'Connection', 'Content-Length', 'Content-Type', 'Date',
// 'Etag', 'Server', 'Via', 'X-Powered-By']
// }

// app.get('/:id\.?:format(json|rss|atom|xml)?', cors(corsOptions), async (req, res) => {
//   const format = req.params.format || 'json'
//   const sourceId = Number(req.params.id)
//   const maxPosts = Number(req.query.maxPosts) || 10
//   const source = await prisma.source.findUnique({ where: { id: sourceId }})
//   if (!sourceId || !source) return res.sendStatus(404)

//   // await prisma..update({ where: { id }, data: { dailyView: { increment: 1 } } })
//   const posts = await prisma.post.findMany({
//     orderBy: [ { date: 'desc'} ],
//     take: maxPosts,
//     where: {
//       sourceId
//     },
//     include: {
//       source: true
//     }
//   })

//   // const accept = accepts(req)
//   // console.error(accept.types())

//   switch (format) {
//     case 'xml':
//     case 'rss':
//     case 'atom':
//       return res
//         .contentType('application/rss+xml')
//         .setHeader('Last-Modified', new Date(source.updatedAt).toUTCString())
//         .set('ETag', Math.round(new Date(source.updatedAt).getTime() / 1000))
//         .send(sourceController.feed(source, posts))
//     case 'json':
//     default:

//       return res.json({ source, posts })
//   }
// })



// app.post('/', async (req, res) => {
//   const URL = req.body.URL
//   // const URL = req.query.URL || req.params.URL || req.body.URL
//   // return
//   // check if URL already exists
//   let dbsource = await prisma.source.findFirst( {
//     where: { URL },
//     include: { 
//       _count: {
//         select: { posts: true }
//       }
//     }
//   })
//   if (dbsource) return res.json(dbsource)
//   let source
//   try {
//     source = await getFeedDetails(URL)
//   } catch (e) {
//     console.error(String(e))
//     return res.sendStatus(404)
//   }

//   if (!source) {
//     return res.sendStatus(404)
//   }
//   dbsource = await prisma.source.findFirst( {
//     where: { URL: source.URL },
//     include: { 
//       _count: {
//         select: { posts: true }
//       }
//     }
//   })
//   if (dbsource) return res.json(dbsource)
//   const ret = await prisma.source.create({ data: {
//     name: source.title,
//     description: source.description,
//     URL: source.URL,
//     link: source.link,
//     updatedAt: source.date || undefined,
//     // image: source.image
//   }})
//   // add(ret)
//   return res.json(ret)

// //   return prisma.cohort.findMany({ take: 10 })
//   // return { status: 'OK'}
// })


// export default app
