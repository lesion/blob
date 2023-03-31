import prisma from './db.js'
import merge from 'lodash.merge'

export const defaultSettings = {
  about: 'About blob, write me',

  // how many minutes I wait before checking for new content
  refresh_loop_minutes: 5,

  // how many posts per source we show in homepage
  max_post_per_source: 2
}

export let settings = {}

export async function getSettings () {
  const settingsArray = await prisma.setting.findMany()
  settings = settingsArray.reduce((s, v) => ({ ...s, [v.key]: JSON.parse(v.value)}), {})
  return merge(defaultSettings, settings)
}
