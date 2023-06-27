<script setup>
const route = useRoute()
const { data } = await useLazyFetch(`/api/post/tag?id=${route.params.id}`, { key: `pt${route.params.id}` })

const { Settings } = useSettings()

// const { data: tag } = useFetch(`/api/tag/${route.params.id}`, { key: `t${route.params.id}` })

</script>

<template>
  <section>
    <Head><Title>{{ Settings.name }} - #{{ data?.tag?.name }}</Title></Head>
    <h2 class="mb-6">{{$t('Tag')}} - {{data?.tag?.name}}</h2>
    <section class='container max-w-80'>
      <Post v-for='post in data?.posts || []' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
