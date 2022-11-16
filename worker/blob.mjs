#!/bin/env node
import db from './db.mjs'
import queue from './queue.mjs'
import manager from './manager.mjs'

async function main() {

  // connect to db
  try {
    await db.connect()
  } catch (e) {
    console.error(e)
    process.exit(-1)
  }

  // connect to queue
  await queue.initialize(manager.get)

  // get all sources
  const sources = await db.getSources()
  console.error(`Found ${sources.length} sources`)

  queue.manage(sources)
}


main()
