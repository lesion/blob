<script setup>
const route = useRoute()

const { data: posts } = useFetch(`/api/post/source?id=${route.params.id}`)
const { data: source } = useFetch(`/api/source?id=${route.params.id}`)

</script>

<template>
<section>
  <Cohorts/>
  <h2>Fonte - {{source?.name}}</h2>
  <p>{{source?.description}}</p>  
  <section class='container max-w-80 mt-6'>
    <Post v-for='post in posts' :key='post.URL' :post='post'/>
  </section>
</section>
</template>
