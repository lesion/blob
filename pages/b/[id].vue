<script setup>
const route = useRoute()

const { data: blob } = useFetch(`/api/blob/${route.params.id}`, { key: 'aa' + route.params.id })
const { data: posts } = useFetch(`/api/post/${route.params.id}`, { key: 'pp' + route.params.id })

</script>

<template>
  <v-container>
    <Blobs />
    <h2 class="mt-6">Blob -
      <v-menu open-on-hover>
        <v-list density='compact'>
          <v-list-item v-for='filter in blob?.Filter' :key='filter.id'>
            <v-list-item-title class='text-body-2'>
            {{filter.sources?.map(s => s.name).join(', ')}} {{filter.tags?.length ? '(' + filter.tags.map(t => t.name).join(',') + ')' : '' }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <template v-slot:activator="{ props }"><u style='cursor: pointer;' v-bind="props">{{blob?.name}}</u></template>
      </v-menu>
    </h2>
    <p>{{blob?.description}}</p>
    <!-- <small>{{blob?.Filter.map(f => f.sources.name + ' (' + (f.tag?.name || 'all') + ')').join(', ')}}</small> -->
    <section class='container max-w-80 mt-6'>
      <Post v-for='post in posts' :key='post.URL' :post='post' />
    </section>
  </v-container>
</template>
