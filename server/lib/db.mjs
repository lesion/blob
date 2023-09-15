import pkg from '@prisma/client'
const { PrismaClient } = pkg
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.DATABASE_URL) {
  console.error(`DATABASE_URL envinronment variable is missing!\r\nPlease setup your .env file using .env.example as an example`)
  process.exit(`DATABASE_URL env is missing`)
}

// turn DATABASE_URL into prisma format and resolve to an absolute path
if (!process.env.DATABASE_URL.startsWith('file:')) {
    process.env.DATABASE_URL = `file:${path.resolve(process.cwd(), process.env.DATABASE_URL)}?socket_timeout=10&connection_limit=1`
}

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

export default prisma