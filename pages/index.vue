<script setup>

const page = ref(0)
const itemsTotal = ref(100)
const itemsPerPage = ref(10)

const { data: posts, pending, refresh, error } = await useFetch(() => `/api/post?page=${page.value}`)

</script>

<template>
  <section class='px-2'>
    <Blobs />
    <section class='container w-full mx-auto p-2'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
