<script setup>
const { data: tags } = useFetch('/api/tag')

const query = ref('')

const filteredTags = computed( () => {
  if (!tags.value) return []
  if (!query.value) { return tags.value }
  return tags.value.filter(t => t.name.includes(query.value))
})

</script>

<template>
  <section>
    <h2 class="mb-6">{{$t('Tags')}}</h2>
    <v-text-field v-model='query' :label="$t('Search')" variant='outlined'></v-text-field>
    <section class='container max-w-80'>
      <v-chip :to='`/tag/${tag.id}`' color='primary' label variant='outlined' class='ma-1' v-for='tag in filteredTags' :key='tag.id'>{{tag.name}}</v-chip>
    </section>
  </section>
</template>
