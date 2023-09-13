import { getLastPosts } from '~~/server/lib/posts.mjs'

export default defineEventHandler(event => {

  try {
    const { after } = getQuery(event)
    return getLastPosts({ after, visibleOnly: !event.context?.auth?.user })
  } catch (e) {
    return sendError(event, '...')
  }
})
