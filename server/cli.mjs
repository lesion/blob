#!/bin/env node
import sade from 'sade'
import { createUser } from './lib/users.js'

const blob = sade('blob')

blob
    .command('user create <username> [<password>]')
    .describe('Create a new user')
    .example('user create admin')
    .action(async (username, password) => {
        const user = await createUser({ username, password })
        console.error(user)
    })


blob.parse(process.argv)