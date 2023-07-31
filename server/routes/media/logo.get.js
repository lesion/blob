import fs from 'fs'
import { sendStream } from 'h3'
import path from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const filePath = path.resolve(config.uploadPath, 'logo.png')
  if (fs.existsSync(filePath)) {
    return sendStream(event, fs.createReadStream(filePath))
  } else {
    return sendStream(event, fs.createReadStream('./public/blob_small.png'))
  }
})