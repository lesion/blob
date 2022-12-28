<script setup>
const route = useRoute()

const { data: posts } = useFetch(`/api/source/posts/${route.params.id}`, { key: `sp${route.params.id}` })
const { data: source } = useFetch(`/api/source/${route.params.id}`, { key: 's${route.params.id}' })

</script>

<template>
  <v-container>
    <h2>{{$t('Source')}} - <a :href='source?.link'>{{source?.name}}</a></h2>
    <p>{{source?.description}}</p>
    <section class='container max-w-80 mt-6'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </v-container>
</template>
