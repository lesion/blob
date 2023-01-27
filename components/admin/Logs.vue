<script setup>
  const { data: logs, pending, refresh, error } = await useFetch(() => `/api/log`)
  const headers = [
    { title: 'Type', key: 'type'},
    { title: 'Source', key: 'source.name'},
    { title: 'Date', key: 'createdAt'},
    { title: 'Message', key: 'message' } ]
  const itemsPerPage = 20

</script>
<template>
  <p>{{logs.length}}</p>
  <v-data-table density='compact' v-model:items-per-page="itemsPerPage" :headers='headers' :items='logs' item-value='message'></v-data-table>
</template>