export default defineNuxtPlugin(async () => {
    const { Settings, loadSettings } = useSettings()
    await loadSettings()
})
