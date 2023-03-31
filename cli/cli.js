#!/bin/env node
import sade from 'sade'
import { createUser, removeUser } from '../server/lib/users.js'
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
  .command('user remove <username>')
  .describe('Remove specified user')
  .example('user remove admin')
  .action(async (username) => {
    return removeUser(username)
  })


blob.parse(process.argv)
