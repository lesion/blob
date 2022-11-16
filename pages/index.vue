<script setup>

const page = ref(0)
const itemsTotal = ref(100)
const itemsPerPage = ref(10)

const { data: posts, pending, refresh, error } = await useFetch(() => `/api/post?page=${page.value}`)

</script>

<template>
  <section>
    <Blobs />
    <section class='container max-w-80'>
      <!-- <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="sm" /> -->
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </section>
</template>
