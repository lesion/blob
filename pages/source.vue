<script setup>
import { ref } from 'vue'

  let url = ref('')
  let error = ref('')
  let loading = ref(false)
  // let sources = ref([])

  const headers = [
      { text: 'Actions', value: 'actions' },
      { text: 'Name', value: 'name', },
      { text: 'Description', value: 'description' },
      { text: 'Updated', value: 'updatedAt' }
    ]
  
  // const ret = await useFetch(`/api/source`)
  const { pending, data: sources } = useLazyFetch('/api/source')
  // console.error(ret)

  const copy = (_ev, item) => {
    console.error('dentro copy')
    const str = `<display-feed feed='/v1/source/${item.id}'></display-feed>`
    try {
      navigator.clipboard.writeText(str)
    } catch (e) {
      const el = document.createElement('textarea')
      el.addEventListener('focusin', e => e.stopPropagation())
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }

  async function addSource () {
    loading = true
    error = false
    // add http if not specified
    url.value = url.value.match(/^https?:\/\//) ? url.value : 'http://' + url.value
    error = ''
    // invio un url al backend
    // se e' un feed valido, lo aggiungo ai sources e all cohort appena creata
    // se non e' valido provo a cercare il feed dentro quell'url
    try {
      const source = await $fetch(`/api/source/add`, { method: 'POST', body: { URL: url.value }})
      sources.value.unshift( source )
      // $emit('addCohort', { id: 1, title: title })
      // url = ''
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
    <h2>Aggiungi un sito o un feed rss, atom, jsonfeed</h2>

    <input type='text' v-model='url' outlined label='Add URL' required/>
    <button @click='addSource' :loading='loading' :error-messages='error' :disabled='loading'>Aggiungi</button>

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
      <caption>Sources</caption>
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Link</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Last post</th>
              <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
      </thead>
      <tbody>
          <tr class="bg-white border-b" v-for='source in sources' :key='source.id'>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" v-text='source.name'></th>
              <td class="px-6 py-4"><a :href="source.link" v-text='source.link'></a></td>
              <td class="px-6 py-4" v-text='source.status'></td>
              <td class="px-6 py-4" v-text='source.updatedAt'></td>
              <td class="px-6 py-4 text-right">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
</section>
</template>