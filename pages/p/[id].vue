<script setup>
const route = useRoute()
const loading = ref(false)
const { Settings } = useSettings()

const { data: post, pending } = await useLazyFetch(`/api/post/detail/${route.params.id}`, { key: route.params.id })

useHead( {
  title: `${Settings?.value.name} - ${post?.value?.title}`
})


</script>

<template>
  <v-sheet v-if='!pending' :loading="pending">
    <!-- header -->
    <h2>{{ post?.title }}</h2>
    <div v-html="post?.content"></div>
  </v-sheet>
</template>
