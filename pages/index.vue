<script setup>

const loading = ref(false)
const { data: posts, pending, refresh, error } = await useFetch(() => `/api/post`)

const infiniteScrolling = async (isIntersecting, entries, observer) => {
  if (isIntersecting && posts.value.length) {
    loading.value = true
    const { data: ret } = await useFetch(`/api/post?after=${posts.value[posts.value.length-1].date}`)
    if (ret.value.length) {
      posts.value.push(...ret.value)
    }
    loading.value = false
  }
}

</script>

<template>
  <v-container>
    <Blobs />
    <Post v-for='post in posts' :key='post.URL' :post='post' />
    <div class='ma-12 text-center' v-intersect="infiniteScrolling">
      <br/>
      <v-progress-circular v-if='loading' indeterminate />
    </div>
  </v-container>
</template>
