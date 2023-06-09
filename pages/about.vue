<script setup>
const { data: Settings = {} } = await useLazyFetch('/api/setting')
const { data: Sources  = [] } = await useLazyFetch('/api/source')
</script>
<template>
  <section>
    <h2>{{$t('About', { name: Settings.name })}}</h2>
    <span v-html='Settings.about'></span>
    <template v-if='Settings.showSourcesInAbout'>
      <h2 class='mt-6'>{{$t('Sources')}}</h2>
      <v-list :items='Sources' lines='two' item-title='name' item-value='id'  item-props="item">
        <template v-slot:subtitle='{ item }'>
          {{item.description}}<br/>
          {{item.URL}} / {{item.type}} 
        </template>
      </v-list>
    </template>
  </section>
</template>

