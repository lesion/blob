<script setup>
const route = useRoute()

const { data } = useFetch(`/api/post/tag?id=${route.params.id}`, { key: `pt${route.params.id}` })
// const { data: tag } = useFetch(`/api/tag/${route.params.id}`, { key: `t${route.params.id}` })

</script>

<template>
  <section>
    <h2 class="mb-6">Tag - {{data?.tag?.name}}</h2>
    <section class='container max-w-80'>
      <Post v-for='post in data?.posts || []' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
