<script setup>
const route = useRoute()

const data = reactive({
  loading: false
})

const { data: posts, pending: pendingPosts } = await useLazyFetch(`/api/source/posts/${route.params.id}`, { key: `sp${route.params.id}` })
const { data: source, pending: pendingSource } = await useLazyFetch(`/api/source/${route.params.id}`, { key: `s${route.params.id}` })


const infiniteScrolling = async (isIntersecting) => {
  if (isIntersecting && posts.value.length) {
    data.loading = true
    const { data: ret } = await useLazyFetch(`/api/source/posts/${route.params.id}?after=${posts.value[posts.value.length-1].date}`)
    if (ret.value.length) {
      posts.value.push(...ret.value)
    }
    data.loading = false
  }
}

</script>

<template>
  <v-container>
    <template v-if="!pendingPosts && !pendingSource">
      <h2>{{$t('Source')}} - <a :href='source?.link'>{{source?.name}}</a></h2>
      <p>{{source?.description}}</p>
      <Post v-for='post in posts'
        :key='post.id'
        :post='post'
        @remove="posts.splice(id, 1)"
        @toggleVisibility="post.visible = !post.visible"
      />
      <div class='ma-12 text-center' v-intersect="infiniteScrolling">
        <v-progress-circular v-if='data.loading' indeterminate />
      </div>
    </template>
    <v-progress-circular v-else  indeterminate />
  </v-container>
</template>
