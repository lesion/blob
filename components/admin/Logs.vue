<script setup>
  const { data: logs, pending, refresh, error } = await useFetch(() => `/api/log`)
  const headers = [
    { title: 'Type', key: 'type'},
    { title: 'Source', key: 'source.name'},
    { title: 'Date', key: 'createdAt'},
    { title: 'Message', key: 'message' } ]

</script>
<template>
  <v-data-table density='compact' :headers='headers' :items='logs' item-value='message'></v-data-table>
</template>