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
    <h2>{{$t('Blobs')}}</h2>
    <p class="font-weight-light mb-6">{{ $t('blob.description') }}</p>
    <v-text-field v-model='query' :label="$t('Search')" variant='outlined'></v-text-field>
    <section class='container max-w-80'>
      <v-list lines='two' variant="flat" v-if="blobs?.length">
        <v-list-item  :to='`/b/${blob.id}`' v-for='blob in filteredBlobs' :key='blob.id'>
          <template v-if='blob.pin' #append><v-icon color="red">mdi-pin</v-icon></template>
          <v-list-item-title>{{ blob.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ blob.description }}</v-list-item-subtitle>
          <div v-for='filter in blob?.Filter' :key='filter.id'>
            <v-chip v-for='source in filter.sources' :key='source.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{source.name}}</v-chip>
            <v-chip v-for='tag in filter.tags' :key='tag.id' label variant='outlined' size='small' :color='filter.inclusive ? "red": "indigo"' class='mr-1 mt-1'>{{tag.name}}</v-chip>
          </div>
        </v-list-item>
      </v-list>
    </section>
  </section>
</template>
