<script setup>
import { ref } from 'vue'
import { when } from '../webcomponents/src/helpers.js'
const { $confirm, $notify } = useNuxtApp()

let url = ref('')
let error = ref('')
let loading = ref(false)

const { data: sources, refresh: refreshSources } = useLazyFetch('/api/source')

async function remove(source) {
  try {
    // const ret = $emit('confirmDialog', { msg: 'ciao' })
    const ret = await $confirm(`Are you sure yo want to remove <u>${source.name || source.link}</u>?`)
    if (ret) {
      await $fetch(`/api/source/${source.id}`, { method: 'DELETE', })
      refreshSources()
    }
  } catch (e) {
    console.error(e)
  }
}

async function addSource() {
  loading.value = true
  error.value = false
  // add http if not specified
  url.value = url.value.match(/^https?:\/\//) ? url.value : 'http://' + url.value
  error.value = ''
  // invio un url al backend
  try {
    await $fetch(`/api/source`, { method: 'POST', body: { URL: url.value } })
    refreshSources()
    url.value = ''
  } catch (e) {
    $notify(e.statusMessage)
  }
  loading.value = false
}

</script>

<template>
  <v-container>
    <v-card-title>{{$t('source.title')}}</v-card-title>
      <form @submit.prevent="addSource">
        <v-text-field v-model='url' color='indigo' variant='outlined' label='URL' required :loading='loading' :disabled='loading'>
          <template v-slot:append-inner>
            <v-progress-circular v-if='loading' indeterminate />
            <v-icon v-else>mdi-plus</v-icon>
          </template>
        </v-text-field>
      </form>

      <v-card-title>{{$t('Source list')}}</v-card-title>
      <v-table>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">{{$t('Name')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Status')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Last post')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('N. posts')}}</th>
            <th scope="col" class="px-6 py-3 text-right">{{$t('Actions')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for='source in sources' :key='source.id'>
            <th scope="row" class="whitespace-nowrap">
              {{source.name}}<br /><a class='font-weight-light' :href="source.link" v-text='source.link' target='_blank'></a>
            </th>
            <td v-text='source.status'></td>
            <td v-text='when(source.updatedAt)'></td>
            <td v-text='source._count.posts'></td>
            <td class="text-right">
              <v-btn class='mr-1' variant='text' :to='`/s/${source.id}`' color='success' icon='mdi-eye' />
              <v-btn class='mr-1' variant='text' @click='remove(source)' icon='mdi-delete' color='warning'/>
            </td>
          </tr>
        </tbody>
      </v-table>
  </v-container>
</template>