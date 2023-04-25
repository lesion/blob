import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const form = formidable()
  const data = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      if (!files.fallbackImage) {
        resolve({
          status: "error",
          message: "Please upload a fallback image",
        });
      }

      if (files.logo[0].mimetype.startsWith("image/")) {
        const oldPath = files.fallbackImage[0].filepath
        const newPath = path.join(config.uploadPath, 'fallbackImage.png')
        fs.copyFileSync(oldPath, newPath)
        resolve({ status: "ok" })
      } else {
        resolve({
          status: "error",
          message: "Please upload nothing but images.",
        })
      }
    })
  })
  return data
})