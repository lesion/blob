import prisma from "~~/server/lib/db"
import { getSettings } from '~~/server/lib/settings'


export default defineEventHandler((event) => {
  return getSettings()
})