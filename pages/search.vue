<script setup>

definePageMeta({
  middleware: (from, to) => {
    const { Settings } = useSettings()
    if (!Settings.value.enableSearch) return navigateTo('/')
    return
  }
})

const route = useRoute()
const { query } = route.query
const search = ref(query)
const { data: posts, refresh, pending } = useLazyFetch('/api/post/search', { params: { query: search }, watch: false })
</script>
<template>
  <div>
    <v-text-field variant='outlined' :loading="pending" :disabled="pending"
      hide-details :placeholder="$t('Search')" single-line
      v-model='search' @keypress.enter="refresh"
      append-inner-icon="mdi-magnify" class='my-2'></v-text-field>    
    <Post v-for='post in posts' :key='post.id' :post='post'
      @remove="posts.splice(id, 1)"
      @toggleVisibility="post.visible = !post.visible"    
    />
  </div>
</template>