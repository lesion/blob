import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()
import express from 'express'
const app = express.Router()

app.get('/search', async (req, res) => {
    const search = req.query.search || ''
    const sources = await prisma.tag.findMany({ where: { name: { contains: search } } })
    return res.json(sources)
  })

export default app