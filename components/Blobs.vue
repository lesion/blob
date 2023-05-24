<script setup>

const { data: blobs = [] } = await useLazyFetch('/api/blob?pin=true')
</script>

<template>
  <v-btn rounded="0" variant='outlined' color='red' v-for='blob in blobs' :key='blob.id' :to='`/b/${blob.id}`' class='mr-1'>{{blob.name}}</v-btn>
</template>
