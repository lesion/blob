import prisma from "../../lib/db"

/** */
export default defineEventHandler(async (event) => {
  let { key, value } = await readBody(event)
  value = JSON.stringify(value)
  await prisma.setting.upsert({ update: { value }, create: { key, value }, where: { key }  })
    .catch(e => {
      console.error(e)
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Error' }))
    })
  
  return true
})
