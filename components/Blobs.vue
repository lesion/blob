<script setup>

const { data: blobs = [] } = await useLazyFetch('/api/blob?pin=true')
</script>

<template>
  <div class="d-flex flex-wrap blobs text-red">
    <v-btn variant='outlined' v-for='blob in blobs' :key='blob.id' :to='`/b/${blob.id}`'>{{blob.name}}</v-btn>
  </div>
</template>

<style scoped>
.blobs {
  gap: 5px;
}
</style>