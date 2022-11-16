import pkg from '@prisma/client'
const { PrismaClient } = pkg

let prisma = null

export default {
  connect () {
    prisma = new PrismaClient({
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' }
      ]
    })
    
    prisma.$on('warn', (e) => {
      console.log(e)
    })
    
    prisma.$on('info', (e) => {
      console.log(e)
    })
    
    prisma.$on('error', (e) => {
      console.log(e)
    })
    
    return prisma.$connect()
  },

  /** get all the sources to monitor */
  getSources () {
    return prisma.source.findMany()
  },

  async createPost (data) {
    return prisma.post.create(data)
  },

  /**
   * check if post is new, updated or unknown
   * @param {Post} post 
   */
  async isPostNew (post) {
    const ret = await prisma.post.findUnique({ where: { URL: post.link } })
    return !ret    
  },

  async sourceError (e, source, res) {
    try {
      await prisma.source.update({ where: { id: source.id }, data: { status: 'WARNING', lastError: String(err) } })
    } catch (e) {
      console.error(source, e)
    }
  },

  async sourceCompleted (source, res) {
    try {
      await prisma.source.update({ where: { id: source.id },
        data: {
          status: 'OK', 
          lastError: null,
          // updatedAt: res.headers.get('Last-Modified'),
          ETag: res.headers.get('ETag')
        } })
    } catch (e) {
      console.error(source, e)
    }    
  },


  async getSource (id) {
    return prisma.source.findUnique({ where: { id }})
  }

}