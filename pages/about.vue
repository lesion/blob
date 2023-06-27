<script setup>
const { Settings } = useSettings()
const { data: Sources  = [] } = await useLazyFetch('/api/source')
</script>
<template>
  <section>
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

