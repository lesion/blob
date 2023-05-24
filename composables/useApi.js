export default () => {

  //   const { data: Settings } = await useFetch('/api/setting')
  // const Settings = useState('settings', () => reactive({
  //   about: 'sdf',
  //   max_posts_per_source: 2,
  //   refresh_loop_seconds: 1000
  // }))

  // const getSettings = async () => {
  //   const { data } = await useFetch('/api/setting')
  //   return data
  // }

  const addURL = URL => {
    console.error('dentro addURL', URL)
    return URL => useLazyFetch('/api/post/add', { key: URL, method: 'POST', body: { URL } })
  }
  
  // const searchPosts = query => useLazyFetch('/api/post/search', { params: { query } })

  return { addURL, searchPosts }
}
