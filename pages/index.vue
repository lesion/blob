<script setup>

const { data: posts, pending, refresh, error } = await useFetch(() => `/api/post`)

</script>

<template>
  <section class='px-2'>
    <Blobs />
    <section class='flex flex-col flex-wrap gap-2'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
