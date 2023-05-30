<script setup>

const { data: blobs = [] } = await useLazyFetch('/api/blob?pin=true')
</script>

<template>
  <div class="d-flex flex-wrap blobs">
    <v-btn variant='outlined' color='primary' v-for='blob in blobs' :key='blob.id' :to='`/b/${blob.id}`'>{{blob.name}}</v-btn>
  </div>
</template>

<style scoped>
.blobs {
  gap: 5px;
}
</style>