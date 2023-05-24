export default () => {
  
  // const { data: Settings } = await useFetch('/api/setting')
  const Settings = useState('settings', () => ref({
    about: 'sdf',
    max_posts_per_source: 2,
    refresh_loop_seconds: 1000
  }))

  const loadSettings = async () => {
    Settings.value = await $fetch('/api/setting')
  }

  const saveSetting = async (key, value) => {
    console.error('dentro save setting', key, value)
    Settings.value[key] = value
    await $fetch(`/api/setting`, { method: 'POST', body: { key, value } })
  }

  return { Settings, saveSetting, loadSettings }
}
