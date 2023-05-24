
import { removeRefreshToken } from "~~/server/lib/refreshTokens"
import { sendRefreshToken, sendAccessToken } from "~~/server/lib/jwt"

export default defineEventHandler(async (event) => {
    try {
        const cookies = getCookies(event)
        const refreshToken = cookies.refresh_token
        await removeRefreshToken(refreshToken)
    } catch (error) { }

    sendRefreshToken(event, null)
    sendAccessToken(event, null)

    return { message: 'Done' }
})