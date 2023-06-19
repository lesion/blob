import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../lib/jwt.js"
import { getUserById } from "../lib/users"

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
    ]

    const isHandledByThisMiddleware = endpoints.some(endopoint => {
        const pattern = new UrlPattern(endopoint)

        return pattern.match(event.req.url)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    // const token = event.req.headers['authorization']?.split(' ')[1]
    const token = getCookie(event, 'access_token')

    const decoded = decodeAccessToken(token)

    if (!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }


    try {
        const userId = decoded.userId

        const user = await getUserById(userId)

        event.context.auth = { user }
    } catch (error) {
        return
    }

})