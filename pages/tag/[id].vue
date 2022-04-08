<script setup>
const route = useRoute()

const { data: posts } = useFetch(`/api/post/tag?id=${route.params.id}`)
const { data: tag } = useFetch(`/api/tag?id=${route.params.id}`)

</script>

<template>
<section>
  <Cohorts/>
  <h2 class="mb-6">Tag - {{tag?.name}}</h2>
  <section class='container max-w-80'>
    <Post v-for='post in posts' :key='post.URL' :post='post'/>
  </section>
</section>
</template>
