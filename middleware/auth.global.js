// import useAuth from "../composables/useAuth"

export default defineNuxtRouteMiddleware( async (to, from) => {
    // funziona ma dovrei fare un filtro per path
    const { getUser, authUser } = useAuth()
    if (process.server) {
        const token = useCookie('access_token')
        if (token.value) {
            try {
                await getUser(token.value)
            } catch (e) {
                console.error('ciao')
            }
        }
    }

    // if (to.meta)
    if(!to.meta?.role) return
    if(to.meta.role && !authUser.value?.id) {
        return navigateTo('/signin')
    }
})