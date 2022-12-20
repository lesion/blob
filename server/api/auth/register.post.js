import { createUser } from '~~/server/lib/users'

export default defineEventHandler(async event => {
    const body = await readBody()
    const { username, password } = body
    if (!username || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const User = await createUser({
        username,
        password
    })

    return { body: User }

  })
  