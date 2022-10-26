<script setup>
import { ref } from 'vue'

let url = ref('')
let error = ref('')
let loading = ref(false)

const { data: sources } = useLazyFetch('/api/source')

async function addSource() {
  loading = true
  error = false
  // add http if not specified
  url.value = url.value.match(/^https?:\/\//) ? url.value : 'http://' + url.value
  error = ''
  // invio un url al backend
  // se e' un feed valido, lo aggiungo ai sources e all cohort appena creata
  // se non e' valido provo a cercare il feed dentro quell'url
  try {
    loading = true
    const source = await $fetch(`/api/source`, { method: 'POST', body: { URL: url.value } })
    sources.value.unshift(source)
  } catch (e) {
    error = String(e)
    console.error(error)
  }
  loading = false
}

</script>

<template>
  <section class='mt-4'>
    <div class="rounded overflow-hidden shadow-lg p-4 w-full">
      <h2>{{$t('Add a website or a feed rss, atom, jsonfeed')}}</h2>
      <form @submit.prevent="addSource">
        <input type='text' v-model='url' outlined placeholder='Add URL' required />
        <button :loading='loading' :error-messages='error' :disable='loading'>{{$t('Add')}}</button>
      </form>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
        <caption>Sources</caption>
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">{{$t('Name')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Status')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Last post')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Actions')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for='source in sources' :key='source.id'>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{source.name}}<br /><a :href="source.link" v-text='source.link'></a>
            </th>
            <td class="px-6 py-4" v-text='source.status'></td>
            <td class="px-6 py-4" v-text='source.updatedAt'></td>
            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{$t('Remove')}}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
