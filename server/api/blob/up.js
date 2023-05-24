import { moveUp } from "~~/server/lib/blobs"

export default defineEventHandler(async (event) => {
  const { blobIndex } = await getQuery(event)
  await moveUp(blobIndex)
  
  return { status: 'ok' }
})
