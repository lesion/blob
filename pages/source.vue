<script setup>
import { ref } from 'vue'
import { when } from '../webcomponents/src/helpers.js'

let url = ref('')
let error = ref('')
let loading = ref(false)

const { data: sources, refresh: refreshSources } = useLazyFetch('/api/source')

async function remove(source) {
  try {
    await $fetch(`/api/source/${source.id}`, { method: 'DELETE', })
    refreshSources()
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
  // se e' un feed valido, lo aggiungo ai sources e all cohort appena creata
  // se non e' valido provo a cercare il feed dentro quell'url
  try {
    await $fetch(`/api/source`, { method: 'POST', body: { URL: url.value } })
    refreshSources()
    url.value = ''
  } catch (e) {
    error.value = String(e)
    console.error(error)
  }
  loading.value = false
}

</script>

<template>
  <section class='mt-4'>
    <i-card>
      <h2>{{$t('Add a website or a feed rss, atom, jsonfeed')}}</h2>
      <form @submit.prevent="addSource">
        <i-input v-model='url' placeholder='Add URL' required>
          <template #append>
            <i-button :loading='loading' :disabled='loading'>{{$t('Add')}}</i-button>
          </template>
        </i-input>
      </form>

      <i-table>
        <caption>Sources</caption>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">{{$t('Name')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Status')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Last post')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Actions')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for='source in sources' :key='source.id'>
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              {{source.name}}<br /><a :href="source.link" v-text='source.link'></a>
            </th>
            <td class="px-6 py-4" v-text='source.status'></td>
            <td class="px-6 py-4" v-text='when(source.updatedAt)'></td>
            <td class="px-6 py-4 text-right">
              <i-button @click='remove(source)'>{{$t('Remove')}}</i-button>
              <i-button :href='`/s/${source.id}`'>{{$t('View')}}</i-button>
            </td>
          </tr>
        </tbody>
      </i-table>
    </i-card>
  </section>
</template>
