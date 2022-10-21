<script setup>
const route = useRoute()

const { data: posts } = useFetch(`/api/post/${route.params.id}`)
const { data: blob } = useFetch(`/api/blob/${route.params.id}`)

</script>

<template>
  <section>
    <Blobs />
    <h2 class="mt-6">Blob - <u>{{blob?.name}}</u></h2>
    <p>{{blob?.description}}</p>
    <small>{{blob?.Filter.map(f => f.source.name + ' (' + (f.tag?.name || 'all') + ')').join(', ')}}</small>
    <section class='container max-w-80 mt-6'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
