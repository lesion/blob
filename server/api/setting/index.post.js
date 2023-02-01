import prisma from "../../lib/db"

/** */
export default defineEventHandler(async (event) => {
  const { key, value } = await readBody(event)
  console.error(key, value)
  
  await prisma.setting.update({ data: {key, value}, where: { key }  })
    .catch(e => {
      console.error(e)
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Error' }))
    })
  
  return true
})
