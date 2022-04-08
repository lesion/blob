<script setup>
const route = useRoute()

const { data: posts } = useFetch(`/api/post/cohort?id=${route.params.id}`)
const { data: cohort } = useFetch(`/api/cohort?id=${route.params.id}`)

</script>

<template>
<section>
  <Cohorts/>
  <h2 class="mt-6">Blob - <u>{{cohort?.name}}</u></h2>
  <p>{{cohort?.description}}</p>
  <small>{{cohort?.Filter.map(f => f.source.name + ' (' + (f.tag?.name || 'tutto') + ')').join(', ')}}</small>
  <section class='container max-w-80 mt-6'>
    <Post v-for='post in posts' :key='post.URL' :post='post'/>
  </section>
</section>
</template>
