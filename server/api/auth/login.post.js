import bcrypt from "bcrypt"
import { getUserByUsername } from "../../lib/users.js"
import { generateTokens, sendRefreshToken, sendAccessToken } from "../../lib/jwt.js"
import { createRefreshToken } from "../../lib/refreshTokens.js"

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)
    sendAccessToken(event, accessToken)

    return { user }

}) 