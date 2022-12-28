<script setup>

const { data: posts, pending, refresh, error } = await useFetch(() => `/api/post`)

</script>

<template>
  <v-container>
    <Blobs />
    <v-list lines='three'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </v-list>
  </v-container>
</template>
