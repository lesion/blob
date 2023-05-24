import { getSettings } from '~~/server/lib/settings'


export default defineEventHandler((event) => {
  return getSettings()
})