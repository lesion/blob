import Queue from 'bull'
let queue

const q = {
  jobs: [],
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
      queue.process(manager)
    }
  },

  addPost (postURL) {
    queue.add({ type: 'url', postURL })
  },

  addSource (source) {
    queue.add({ type: 'source', sourceId: source.id })
    q.jobs[source.id] = queue.add({ type: 'source', sourceId: source.id }, { jobId: source.id, repeat: { every: 100000 } })
  },

  removeSource (sourceId) {
    if (q.jobs[sourceId]) {
      q.jobs[sourceId].remove()
    } else {
      console.error('nonono', sourceId)
    }
  },

  manage (sources) {
    sources.forEach(q.addSource)
    // sources.forEach(s => queue.add(s, { jobId: s.id, repeat: { every: 100000 } }))
  }
}

export default q