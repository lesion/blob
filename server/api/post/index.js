import { getLastPosts } from '~~/server/lib/posts'

export default defineEventHandler(event => {
  return getLastPosts()
})
