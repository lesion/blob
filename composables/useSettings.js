export default () => {
  
  // const { data: Settings } = await useFetch('/api/setting')
  const Settings = useState('settings', () => reactive({}))

  const loadSettings = async () => {
    Settings.value = await $fetch('/api/setting')
  }

  const saveSetting = async (key, value) => {
    Settings.value[key] = value
    await $fetch(`/api/setting`, { method: 'POST', body: { key, value } })
  }

  return { Settings, saveSetting, loadSettings }
}
