<script setup>

const loading = ref(false)
const search = ref('')
const { Settings } = useSettings()

definePageMeta({
  middleware: (from, to) => {
    const { Settings } = useSettings()
    if (Settings.value.showBlobInHome && Settings.value.blobIdInHome) {
      return navigateTo(`/b/${Settings.value.blobIdInHome}`)
    }
    return
  }
})

const { data: posts = [], pending, refresh, error } = await useLazyFetch(`/api/post`)

const preloadImage = computed( () => posts?.value?.length && posts?.value[0]?.image ?
  '/media/' + posts?.value[0]?.image.replace(/.jpg$/, '.webp') : 
  '/media/fallbackImage.webp')

useHead( {
  title: Settings?.value?.name || 'Blob',
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: Settings?.value?.name || 'Blob', href: '/feed' },
    { rel: 'preload', as: 'image', href: preloadImage },
    { rel: 'preload', as: 'image', href: '/media/logo' }
  ]
})


const customURLDialog = ref(null)

const infiniteScrolling = async (isIntersecting, entries, observer) => {
  if (isIntersecting && posts?.value.length) {
    loading.value = true
    const { data: ret } = await useLazyFetch(`/api/post?after=${posts?.value[posts?.value.length-1].date}`)
    if (ret.value.length) {
      posts?.value.push(...ret.value)
    }
    loading.value = false
  }
}

const isValidUrl = urlString => /^https?:\/\/.+\..+/.test(urlString)

const isURL = computed( () => isValidUrl(search.value))
const searchIconString = computed(() => isURL.value ? 'mdi-search-web' : 'mdi-magnify')

async function change () {
  if (Settings.value.allowAddURL && isURL.value) {
    customURLDialog.value.open(search.value)
  } else {
    navigateTo({ path: '/search', query: { query: search.value }})
  }
}

async function customURLAdded () {
  search.value = ''
  await refresh()
}

</script>

<template>
  <div>
    <p v-if='Settings.tagline' v-text='Settings.tagline' />
    <v-text-field variant='outlined' v-if='Settings.enableSearch'
      hide-details :placeholder="$t(Settings.allowAddURL ? 'Search or paste an URL' : 'Search')" single-line
      @change='change' v-model='search' @keypress.enter="change"
      :append-inner-icon="searchIconString" class='my-2' />
    <client-only>
      <CustomURLDialog ref="customURLDialog" @added="customURLAdded"/>
    </client-only>
    <Blobs />
    <Post v-for='(post, id) in posts'
      :key='post.id'
      :post='post'
      @remove="posts.splice(id, 1)"
      @toggleVisibility="post.visible = !post.visible"/>
    <div class='ma-12 text-center' v-intersect="infiniteScrolling">
      <v-progress-circular v-if='loading' indeterminate />
    </div>
  </div>
</template>
