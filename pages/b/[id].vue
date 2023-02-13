<script setup>
const route = useRoute()

const { data: blob } = useFetch(`/api/blob/${route.params.id}`, { key: 'aa' + route.params.id })
const { data: posts } = useFetch(`/api/post/${route.params.id}`, { key: 'pp' + route.params.id })

</script>

<template>
  <v-container>
    <Blobs />
    <h2 class="mt-6">Blob -
      <client-only>
        <v-menu open-on-hover>
          <v-list density='compact'>
            <v-list-item v-for='filter in blob?.Filter' :key='filter.id'>
              <v-list-item-title class='text-body-2'>
                  <v-chip v-for='source in filter.sources' :key='source.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{source.name}}</v-chip>
                  <v-chip v-for='tag in filter.tags' :key='tag.id' label variant='outlined' size='small' :color='filter.inclusive ? "red": "indigo"' class='mr-1 mt-1'>{{tag.name}}</v-chip>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <template v-slot:activator="{ props }"><u style='cursor: pointer;' v-bind="props">{{blob?.name}}</u></template>
        </v-menu>
        <template v-slot:placeholder><u style='cursor: pointer;'>{{blob?.name}}</u></template>
      </client-only>
    </h2>
    <p>{{blob?.description}}</p>
    <!-- <small>{{blob?.Filter.map(f => f.sources.name + ' (' + (f.tag?.name || 'all') + ')').join(', ')}}</small> -->
    <section class='container max-w-80 mt-6'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </v-container>
</template>
