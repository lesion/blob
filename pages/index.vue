<script setup>

const { data: posts } = useFetch('/api/post')

</script>

<template>
<section>
  <Cohorts/>
  <section class='container max-w-80'>
    <Post v-for='post in posts' :key='post.URL' :post='post'/>
  </section>
</section>
</template>
