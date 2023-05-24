export default defineNuxtPlugin(async () => {
  console.error('sono dentro settings plugins!')
    const { Settings, loadSettings } = useSettings()
    await loadSettings()
})
