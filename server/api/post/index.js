import { getLastPosts } from '~~/server/lib/posts.mjs'

export default defineEventHandler(event => {
  // console.error('auth; ', event.context?.auth?.user)

  try {
    const { after } = getQuery(event)
    return getLastPosts({ after, visibleOnly: !event.context?.auth?.user })
  } catch (e) {
    return sendError(event, '...')
  }
})
