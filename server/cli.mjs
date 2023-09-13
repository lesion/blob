#!/bin/env node
import sade from 'sade'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'path'
import { randomBytes } from 'node:crypto'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
import { createUser, removeUser } from './lib/users.mjs'
const blob = sade('blob')

dotenv.config()

if (!process.env.DATABASE_URL) {
  console.error(`DATABASE_URL envinronment variable is missing!\r\nPlease setup your .env file using .env.example as an example`)
  process.exit(`DATABASE_URL env is missing`)
}

blob
  .command('start')
  .describe('Start blob web interface and API')
  .action(() => {
    import(resolve(__dirname, 'webUI/server/index.mjs'))
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
  .command('user create <username> [<password>]')
  .describe('Create a new user')
  .example('user create admin')
  .action(async (username, password) => {
    const user = await createUser({ username, password })
    console.error(user)
  })
  .command('user remove <username>')
  .describe('Remove specified user')
  .example('user remove admin')
  .action(async (username) => {
    return removeUser(username)
  })

blob.parse(process.argv)
