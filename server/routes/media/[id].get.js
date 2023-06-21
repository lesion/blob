import fs from 'fs'
import { sendStream } from 'h3'
import path from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const fileId = event.context.params.id
  const filePath = path.resolve(config.uploadPath, fileId)
  console.error(config.uploadPath)
  if (fs.existsSync(filePath)) {
    return sendStream(event, fs.createReadStream(filePath))
  } else {
    return sendError(event, createError({ status: 404 }))
  }
})