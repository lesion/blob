<script setup>
const route = useRoute()
const { data } = await useLazyFetch(`/api/post/tag?id=${route.params.id}`, { key: `pt${route.params.id}` })
const loading = ref(false)
const { Settings } = useSettings()


const infiniteScrolling = async (isIntersecting) => {
  if (isIntersecting && data?.value?.posts.length) {
    loading.value = true
    const { data: ret } = await useLazyFetch(`/api/post/tag/?id=${route.params.id}&after=${data?.value.posts[data?.value?.posts.length-1].date}`)

    if (ret.value.posts.length) {
      data.value.posts.push(...ret.value.posts)
    }
    loading.value = false
  }
}

</script>

<template>
  <section>
    <Head><Title>{{ Settings.name }} - #{{ data?.tag.name }}</Title></Head>
    <h2 class="mb-6">{{$t('Tag')}} - {{data?.tag?.name}}</h2>
    <section class='container max-w-80'>
      <Post v-for='post in data?.posts || []' :key='post.id' :post='post'
        @remove="data?.posts.splice(id, 1)"
        @toggleVisibility="post.visible = !post.visible"
      />
      <div class='ma-12 text-center' v-intersect="infiniteScrolling">
        <v-progress-circular v-if='loading' indeterminate />
      </div>      
    </section>
  </section>
</template>
