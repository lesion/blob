
export default async function () {
  async function start (nuxt) {

    // close connections/port/unix socket
    async function shutdown () {
      process.off('SIGTERM', shutdown)
      process.off('SIGINT', shutdown)
      nuxt.close()
      process.exit()
    }
    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
  }
  this.nuxt.hook('listen', start)
}
