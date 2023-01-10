#!/bin/env node
import sade from 'sade'
import { createUser } from '../server/lib/users.js'
// const { createUser } = users
// const users = require('../server/lib/users.js')
const blob = sade('blob')

blob
  .command('user create <username> [<password>]')
  .describe('Create a new user')
  .example('user create admin')
  .action(async (username, password) => {
    const user = await createUser({ username, password })
    console.error(user)
  })
  .command('user reset <username>')
  .describe('Reset password of specified user')
  .example('user reset admin')
  .action(async (username) => {
  })


blob.parse(process.argv)
