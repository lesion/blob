import { getLastPosts } from '~~/server/lib/posts'

export default defineEventHandler(event => {
  try {
    return getLastPosts()
  } catch (e) {
    console.error(e)
    return sendError(event, '...')
  }
})
