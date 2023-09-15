#!/bin/env node
import sade from 'sade'
import { spawn } from 'node:child_process'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const blob = sade('blob')
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

blob
  .command('start')
  .describe('Start blob web interface and API')
  .action(() => {
    process.chdir(__dirname)
    const npx = spawn("npx", ['prisma', 'migrate', 'deploy'])
    npx.stdout.on('data', data => console.log(data.toString()))
    npx.stderr.on('data', data => console.error(data.toString()))    
    import(path.resolve(__dirname, 'webUI/server/index.mjs'))
  })
  .command('worker')
  .describe('Start blob worker')
  .action(() => import('./worker/blob.mjs'))
  .command('migrate')
  .describe('Apply blob database migration')
  .action(() => {
    process.chdir(__dirname)
    const npx = spawn("npx", ['prisma', 'migrate', 'deploy'])
    npx.stdout.on('data', data => console.log(data.toString()))
    npx.stderr.on('data', data => console.error(data.toString()))
  })
  .command('user create <username> <password>')
  .describe('Create a new user')
  .example('user create admin password')
  .action(async (username, password) => {
    const { createUser } = await import('./lib/users.mjs')
    try {
      const user = await createUser({ username, password })
      console.error(`Admin created`)
    } catch (e) {
      console.error(e?.message ?? e)
    }
  })
  .command('user remove <username>')
  .describe('Remove specified user')
  .example('user remove admin')
  .action(async (username) => {
    const { removeUser } = await import('./lib/users.mjs')
    try {
      await removeUser(username)
    } catch (e) {
      console.error(e?.message ?? e)
    }
  })

blob.parse(process.argv)
