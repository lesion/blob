import Queue from 'bull'
let queue

export default {
  async initialize (manager) {
    queue = new Queue('blob', { limiter: { max: 5, duration: 1000 } })

    queue.on('error', err => {
      console.error("\r\n  = Could not connect to redis database! Please install and enable it. \r\n\r\n", err)
      process.exit(-1)
    })
  
    await queue.isReady()
    console.error('Connected to redis')

    await queue.clean(1000)
    await queue.obliterate({ force: true })
    
    queue.process(manager)
  },

  manage (sources) {
    sources.forEach(queue.add)
    sources.forEach(s => queue.add(s, { jobId: s.id, repeat: { every: 100000 } }))
  }
}