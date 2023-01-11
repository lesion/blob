export default defineNuxtPlugin((nuxtApp) => {
  const { $once, $emit } = nuxtApp
  
  function confirm (msg) {
    $emit('confirmDialog', { msg })
    return new Promise((resolve, reject) => {
      $once('confirmDialog:result', resolve)
    })
  }
  
  function notify (msg, status) {
    $emit('notify', { msg, status: 'warning' })
  }

  return { provide: { confirm, notify } }
})