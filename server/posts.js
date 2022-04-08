// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;
// const prisma = new PrismaClient()
// import express from 'express'
// const app = express.Router()

// app.get('/', async (req, res) => { res.json(await prisma.post.findMany({ take: 10, orderBy: { date: 'desc' }, include: { tags: true, source: true  }})) })


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

// export default app
