#!/bin/env node
import sade from 'sade'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'path'
import { randomBytes } from 'node:crypto'

import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
import { createUser, removeUser } from './lib/users.js'
const blob = sade('blob')

if (!process.env.DATABASE_URL) {
  process.exit(`DATABASE_URL env is missing`)
}

blob
  .command('start')
  .describe('Start blob web interface and API')
  .action(() => {
    import(resolve(__dirname, '.output/server/index.mjs'))
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
  .command('env')
  .describe('Output .env example')
  .example('env > .env')
  .action(() => {

    console.log(`# env
DATABASE_URL="file:${process.cwd()}/blob.db?socket_timeout=10&connection_limit=1"
NODE_ENV=production

# host to bind server to
NITRO_HOST=127.0.0.1

# port to listen to
NITRO_PORT=4000

# path where to save images to
NUXT_UPLOAD_PATH=${process.cwd()}/uploads/

# base url
NUXT_BASE_URL=http://localhost:4000

NUXT_JWT_ACCESS_TOKEN_SECRET='${randomBytes(32).toString('hex')}'
NUXT_JWT_REFRESH_TOKEN_SECRET='${randomBytes(32).toString('hex')}`)
  })
  .command('systemctl')
  .action(() => {
    console.log(`[Unit]
Description=Blob Service - rsf.mazizone.net
Documentation=https://doc.cisti.org/blZjmjWHSeGha9Y8NVQV4Q?both
After=network.target

[Service]
Type=simple
User=rsf
Restart=on-failure
WorkingDirectory=${process.cwd()}
EnvironmentFile=${process.cwd()}/.env

ExecStart=${process.cwd()}/.yarn/bin/blob-feed start

[Install]
WantedBy=multi-user.target
`)
  })


blob.parse(process.argv)
