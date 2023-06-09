export default defineNuxtPlugin((nuxtApp) => {
  const { $once, $emit } = nuxtApp
  
  function confirm (msg) {
    $emit('confirmDialog', { msg })
    return new Promise((resolve, reject) => {
      $once('confirmDialog:result', resolve)
    })
  }
  
  function notify (msg, status) {
    $emit('notify', { msg, status })
  }

  function prompt (msg, status, name) {
    $emit('promptDialog', { msg, status: 'warning', name })
    return new Promise((resolve, _reject) => {
      $once('promptDialog:result', resolve)
    })
  }  

  return { provide: { confirm, notify, prompt } }
})
