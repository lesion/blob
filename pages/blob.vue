<script setup>
import { ref, computed, reactive } from 'vue'

let selectedSource = ref({})
let selectedTag = ref({})
let blob = reactive({})

let loading = true
let source = ref(null)
//  < !--let cohortSources = ref([])-- >

const { data: blobs, refresh: refreshBlobs } = useLazyAsyncData('cohorts', () => $fetch('/api/blob'))

// const ret = await useFetch('/api/cohort')
// cohorts = ret.data

const addFilterDescription = computed(() => {
  if (!selectedSource.value.name) {
    return 'Seleziona una fonte'
  }
  if (!selectedTag.value.name) {
    return `Aggiungi tutti gli articoli da ${selectedSource.value.name}`
  } else {
    return `Aggiungi tutti gli articoli taggati ${selectedTag.value.name} da ${selectedSource.value.name}`
  }
})

async function addFilter() {
  const blobId = blob.id
  const sourceId = selectedSource.value.id
  const tagId = selectedTag.value.id
  try {
    await $fetch(`/api/blob/filter`, { method: 'POST', body: { cohortId, sourceId, tagId } })
    await refreshBlobs()
    useBlob(blob)
  } catch (e) { }
}

function searchSource(search) {
  return $fetch(`/api/source/search?search=${encodeURIComponent(search)}`)
}

async function searchTag(search) {
  return $fetch(`/api/tag/search?search=${encodeURIComponent(search)}`)
}

async function addBlob() {
  try {
    const ret = await $fetch(`/api/blob`, {
      method: 'POST',
      body: { name: blob.name, description: blob.description }
    })
    await refreshBlobs()
    useBlob(ret)
  } catch (e) {
    console.error(e)
  }
}

async function delBlob(blob) {
  try {
    const ret = await $fetch(`/api/blob/${cohort.id}`, { method: 'DELETE' })
    refreshBlobs()
    console.error(ret)
  } catch (e) {
    console.error(e)
  }
}

async function delFilter(filter) {
  try {
    const ret = await $fetch(`/api/filter/${filter.id}`)
    refreshBlobs()
    useBlob(blob)
    console.error(ret)
  } catch (e) {
    console.error(e)
  }
}


async function addSource() {
  blobSources.unshift(source)
  source = null
  //  sources = []
}

function useBlob(c) {
  console.error(c)
  blob.id = c.id
  blob.name = c.name
  blob.description = c.description
  blob.value = c.Filter?.map(f => ({
    id: f.id,
    sourceId: f.sourceId,
    name: f.source.name,
    link: f.source.link,
    description: f.source.description,
    tag: f.tag?.name
  }))
}

</script>
<template>
  <section class='mt-4'>
    <div class="rounded overflow-hidden shadow-lg p-4">
      <h2>Aggiungi il tuo blob</h2>
      <h6 class="text-grey-200">un blob è un raggruppamento di contenuti presi da fonti scelte, eventualmente filtrate
        per tag</h6>
      <main class='mt-1 mb-6'>

        <input type='text' label='Name' v-model='blob.name' placeholder='Come lo chiamiamo?' />
        <input type='text' label='Description' v-model='blob.description' placeholder='Che roba è?' />

        <button class="disabled:text-opacity-20" @click='addBlob' :disabled='!blob.name'>Create blob</button>

        <section v-if='!!blob.name'>
          <Autocomplete :search='searchSource' v-model='selectedSource' placeholder='Cerca una fonte'>
            <template v-slot:item="{ item }">
              <p>{{ item.name }}</p>
              <small>{{ item.description }}</small>
            </template>
          </Autocomplete>

          <Autocomplete :search='searchTag' v-model='selectedTag' placeholder='Prendo tutto o filtro?'></Autocomplete>

          <button @click='addFilter' :disabled="!selectedSource?.name" v-html='addFilterDescription'></button>


          <Datatable :items='blobSources' :headers='["name", "description", "tag", "azioni"]'>
            <template v-slot:name='{ item }'>
              <th>
                <nuxt-link :to='`/s/${item.sourceId}`' v-text='item.name' />
              </th>
            </template>
            <template v-slot:tag='{ item }'>
              <td>{{item.tag || 'All'}}</td>
            </template>
            <template v-slot:actions='{ item }'>
              <td><button @click='delFilter(item)'>Remove</button></td>
            </template>
          </Datatable>
        </section>

      </main>

      <h2>Lista di blob</h2>
      <main class='mt-2'>

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Filters</th>
              <th scope="col" class="px-6 py-3 float-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-t" v-for='blob in blobs' :key='blob.id'>
              <th scope="row" v-text='blob.name'></th>
              <td class="px-6 py-4" v-text='blob.description'></td>
              <td>
                <div v-for='filter in blob.Filter' :key='filter.id'>{{filter.source.name}} ({{filter.tag?.name ||
                'All'}})</div>
              </td>
              <td class="px-6 py-4 text-right">
                <button class='mr-1' @click='useBlob(blob)'>Usa</button>
                <button class="text-red-300 border-red-300 mr-1" @click='delBlob(blob)'>Remove</button>
                <nuxt-link :to='`/b/${blob.id}`'><button>View</button></nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

    </div>
  </section>
</template>
