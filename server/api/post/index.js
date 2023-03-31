import { getLastPosts } from '~~/server/lib/posts'

export default defineEventHandler(event => {
  try {
    const { after } = getQuery(event)
    return getLastPosts(after)
  } catch (e) {
    return sendError(event, '...')
  }
})
