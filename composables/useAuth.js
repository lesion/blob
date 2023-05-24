import jwt_decode from "jwt-decode"

export default () => {
  const authUser = useState('auth_user', () => {})
  const authLoading = useState('auth_loading', () => true)
  
  const isLogged = computed(() => !!authUser.value?.id )

  const isAdmin = computed(() => !!authUser.value?.role === 'ADMINISTRATOR')

  async function login ({ username, password }) {
    authLoading.value = true

    try {

      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          username,
          password
        }
      })
      
      authUser.value = data.user

    } finally {
      authLoading.value = false
    }
  }
  

  async function refreshToken () {
    try {
      await $fetch('/api/auth/refresh')
    } catch (e) {
      console.error('Error', e)
      authUser.value = {}
    }
  }

  async function getUser (token) {
    const data = await $fetch('/api/auth/user', { headers: {
      cookie: `access_token=${token};`
    } }).catch(e => console.error(e))
    authUser.value = data?.user
  }

  // const reRefreshAccessToken = () => {
  //   const authToken = useAuthToken()
    
  //   if (!authToken.value) {
  //     return
  //   }
    
  //   const jwt = jwt_decode(authToken.value)
    
  //   const newRefreshTime = jwt.exp - 60000
    
  //   setTimeout(async () => {
  //     await refreshToken()
  //     reRefreshAccessToken()
  //   }, newRefreshTime);
  // }
  
  async function initAuth () {
    authLoading.value = true
    try {
      await refreshToken()
      await getUser()
    } finally {
      authLoading.value = false
    }
  }
  
  async function logout () {
    await $fetch('/api/auth/logout', { method: 'POST' })
    authUser.value = {}
  }

  return {
    login,
    logout,
    authUser,
    getUser,
    authLoading,
    isLogged,
    isAdmin,
    initAuth
  }
}