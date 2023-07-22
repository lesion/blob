<script setup>
const route = useRoute()
const loading = ref(false)
const { Settings } = useSettings()

const { data: blob } = await useLazyFetch(`/api/blob/${route.params.id}`, { key: 'aa' + route.params.id })
const { data: posts } = await useLazyFetch(`/api/post/${route.params.id}`, { key: 'pp' + route.params.id })
// const hasNext = ref(posts.value.length === 10)

useHead( {
  title: `${Settings?.value.name} - ${blob?.value?.name}`,
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: Settings?.value?.name || 'Blob', href: `/feed/${route.params.id}` }]
})


const infiniteScrolling = async (isIntersecting, entries, observer) => {
  if (isIntersecting && posts.value?.length) {
    loading.value = true

    const sortBy = blob.value.sortBy
    const timestamp = new Date(posts.value[posts.value.length-1].date).getTime()

    const params = new URLSearchParams({ after: sortBy === 'date' ? timestamp : posts.value[posts.value.length-1][sortBy] })
    const { data: ret } = await useLazyFetch(`/api/post/${route.params.id}?${params}`)
    posts.value.push(...ret.value)
    loading.value = false
  }
}

</script>

<template>
  <v-container>
    <Blobs />
    <h2 class="mt-6"> <a target="_blank" :href="`/feed/${blob?.id}`"><v-icon color="red">mdi-rss</v-icon></a>Blob -
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
    <div class='ma-12 text-center' v-intersect="infiniteScrolling">
      <v-progress-circular v-if='loading'  indeterminate />
    </div>  
    </section>
  </v-container>
</template>
