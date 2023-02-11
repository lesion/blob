export default () => {
  
  const Settings = useState('settings', () => reactive({
    about: 'sdf',
    max_posts_per_source: 2,
    refresh_loop_seconds: 1000
  }))
  
  const getSettings = async () => {
    const { data } = await useFetch('/api/setting')
    
    return data
  }

  const saveSetting = async (key) => {
    const Settings = useState('settings')
    console.error('sono dentro save settings ', Settings, key, Settings[key])
    await $fetch(`/api/setting`, { method: 'POST', body: { key, value: Settings[key] } })
    // Settings[key] = value
  }

  getSettings()

  return { Settings, saveSetting, getSettings }
}