<script setup>
const { data: blobs, pending, error } = await useLazyFetch('/api/blob')

const query = ref('')

const filteredBlobs = computed( () => {
  if (!blobs.value) return []
  if (!query.value) { return blobs.value }
  return blobs.value.filter(b => b.name.includes(query.value))
})

</script>

<template>
  <section>
    <h2 class="mb-6">{{$t('Blobs')}}</h2>
    <v-text-field v-model='query' :label="$t('Search')" variant='outlined'></v-text-field>
    <section class='container max-w-80'>
      <v-card v-if="blobs?.length">
        <v-list lines='two' variant="flat">
          <v-list-item  :to='`/b/${blob.id}`' v-for='blob in filteredBlobs' :key='blob.id'>
            <template v-if='blob.pin' #append><v-icon color="red">mdi-pin</v-icon></template>
            <v-list-item-title>{{ blob.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ blob.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </section>
  </section>
</template>
