<script setup>
const { Settings } = useSettings()
const { data: Sources  = [] } = await useLazyFetch('/api/source')
</script>
<template>
  <section>

    <span v-html='Settings.about'></span>
    <template v-if='Settings.showSourcesInAbout'>
      <h2 class='mt-6'>{{$t('Sources')}}</h2>
      <v-list lines='two'>
        <v-list-item v-for="source in Sources" :to="`/s/${source.id}`">
          <v-list-item-title>
            <v-chip size='small' color="orange" label><v-icon>mdi-rss</v-icon>{{source.type}}</v-chip>  <v-chip color='primary' size="small" label>{{ source._count.posts }} posts</v-chip><br/>
            {{ source.name }} - {{ source.link }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{source.description }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>
  </section>
</template>