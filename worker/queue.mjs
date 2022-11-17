import Queue from 'bull'
let queue

const q = {
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
    
    if (manager) {
      console.error('set manager', typeof manager)
      queue.process(manager)
    }
  },

  addSource (source) {
    queue.add(source.id)
    queue.add(source.id, { jobId: source.id, repeat: { every: 100000 } })
  },

  manage (sources) {
    sources.forEach(q.addSource)
    // sources.forEach(s => queue.add(s, { jobId: s.id, repeat: { every: 100000 } }))
  }
}

export default q