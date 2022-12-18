export default defineNuxtPlugin((nuxtApp) => {
  const { $once, $emit } = nuxtApp
  
  function confirm (msg) {
    $emit('confirmDialog', { msg })
    return new Promise((resolve, reject) => {
      $once('confirmDialog:result', resolve)
    })
  }

  return { provide: { confirm } }
})