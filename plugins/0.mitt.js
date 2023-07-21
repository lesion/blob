import mitt from "mitt"
const emitter = mitt()

export default defineNuxtPlugin( () => ({
  provide: {
    on: emitter.on,
    emitt: emitter.emit,
    emit: emitter.emit,
    once: (type, handler) => {
      const fn = (...args) => {
        emitter.off(type, fn)
        handler(...args)
      }
      emitter.on(type, fn)
    }
  }
}))