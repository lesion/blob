import { getLastPosts } from '~~/server/lib/posts.mjs'

export default defineEventHandler(event => {
  console.error(event.context.auth)

  try {
    const { after } = getQuery(event)
    return getLastPosts(after)
  } catch (e) {
    return sendError(event, '...')
  }
})
