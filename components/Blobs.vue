<script setup>

const { data: blobs } = useFetch('/api/blob')
</script>

<template>
  <section class="py-4 px-2 text-gray-500 font-semibold transition duration-300 mb-6">
    <nuxt-link :to='`/b/${blob.id}`' class="p-2" v-for='blob in blobs' :key='blob.id'>{{blob.name}}
    </nuxt-link>
  </section>
</template>

<style scoped>
a {
  @apply text-red-500 text-xl border-red-100 p-2 border mr-2;
}
</style>
