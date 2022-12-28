<script setup>

const { data: blobs } = useFetch('/api/blob')
</script>

<template>
  <v-btn size='small' variant='outlined' color='indigo' v-for='blob in blobs' :key='blob.id' :to='`/b/${blob.id}`' class='mr-1'>{{blob.name}}</v-btn>
</template>
