
import { userTransformer } from "~~/server/transformers/user"

export default defineEventHandler(async (event) => {

    if (!event.context.auth?.user) {
        sendError(event, createError({ statusCode: 404 }))
    }
    return {
        user: userTransformer(event.context.auth?.user)
    }

})