<script setup>
import { ref, computed, reactive } from 'vue'

let selectedSource = ref({})
let selectedTag = ref({})
let blob = reactive({})

let loading = ref(true)
let source = ref(null)
let sources = ref([])
let blobSources = ref([])

let modalAddBlob = ref(false)
let modalUseBlob = ref(false)

const { data: blobs, refresh: refreshBlobs } = useLazyAsyncData('blobs', () => $fetch('/api/blob'))

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
    await $fetch(`/api/blob/filter`, { method: 'POST', body: { blobId, sourceId, tagId } })
    await refreshBlobs()
    useBlob(blob)
  } catch (e) { }
}

const searchSource = async function (query) {
  loading = true
  query = query ? new URLSearchParams({ query }).toString() : ''
  sources.value = await $fetch(`/api/source?${query}`)
}

async function searchTag(query) {
  query = query ? new URLSearchParams({ query }).toString() : ''
  tags.value = await $fetch(`/api/tag?${query}`)
}

async function addBlob() {
  try {
    const ret = await $fetch(`/api/blob`, {
      method: 'POST',
      body: { name: blob.name, description: blob.description }
    })
    await refreshBlobs()
    modalAddBlob.value = false
    searchSource('')
    useBlob(ret)
  } catch (e) {
    console.error(e)
  }
}

async function delBlob(blob) {
  try {
    const ret = await $fetch(`/api/blob/${blob.id}`, { method: 'DELETE' })
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
  modalUseBlob.value = true
  // console.error('sono dentro user Blobl')
  blob.id = c.id
  blob.name = c.name
  blob.description = c.description
  blob.filter = c.Filter?.map(f => ({
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
      <h2>{{$t('blob.create')}}</h2>
      <h6 class="text-grey-200">{{$t('blob.create_description')}}</h6>
      <main class='mt-1 mb-6'>

        <i-button @click='modalAddBlob=true'>{{$t('blob.create')}}</i-button>
        
        <i-modal v-model='modalAddBlob' show-close>
          <section class='mt-5'>
            <i-form @submit.prevent='addBlob'>
              <i-form-group>
                <i-form-label>{{$t('Name')}}</i-form-label>
                <i-input type='text' v-model='blob.name' :placeholder='$t("blob.what name?")' required/>
              </i-form-group>
              <i-form-group>
                <i-form-label>{{$t('Description')}}</i-form-label>
                <i-input type='text' label='Description' v-model='blob.description' :placeholder="$t('blob.what is it?')" required/>
              </i-form-group>
              <i-form-group>
                <i-button class="disabled:text-opacity-20">{{$t('blob.create')}}</i-button>
              </i-form-group>
            </i-form>
          </section>
        </i-modal>

        <i-modal v-model='modalUseBlob'>
          <section>
            <i-form @submit='addFilter' v-if='blob.name'>

              <i-select autocomplete
                @search='searchSource'
                label='name'
                :options='sources'
                :loading='loading'

                v-model='selectedSource'
                :placeholder="$t('blob.Search for a source')">
                <template #option='{ option } '>
                  <strong>{{option.name}}</strong>
                  <div v-text='option.description'></div>
                </template>
              </i-select>

              <i-select
                :options='tags'
                :search='searchTag' v-model='selectedTag'
                placeholder='Prendo tutto o filtro?'></i-select>

              <button :disabled="!selectedSource?.name" v-html='addFilterDescription'></button>
            </i-form>


          <i-table :items='blobSources' :headers='["name", "description", "tag", "azioni"]'>
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
          </i-table>
        </section>
      </i-modal>

      </main>

      <h2>Lista di blob</h2>
      <main class='mt-2'>

        <i-table>
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Filters</th>
              <th scope="col" class="px-6 py-3 text-right">Actions</th>
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
                <button class='mr-1' @click='useBlob(blob)'>{{$t('Use')}}</button>
                <button class="text-red-300 border-red-300 mr-1" @click='delBlob(blob)'>Remove</button>
                <nuxt-link :to='`/b/${blob.id}`'><button>View</button></nuxt-link>
              </td>
            </tr>
          </tbody>
        </i-table>
      </main>

    </div>
  </section>
</template>
