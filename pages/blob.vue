<script setup>
import { ref, computed, reactive } from 'vue'

const { $confirm } = useNuxtApp()

let selectedSource = ref({})
let selectedTag = ref({})
let blob = reactive({})

let loading = ref(true)
let source = ref(null)
let sources = ref([])
let blobSources = ref([])
let blobTags = ref([])

let modalAddBlob = ref(false)
let modalUseBlob = ref(false)

const { data: blobs, refresh: refreshBlobs } = useLazyAsyncData('blobs', () => $fetch('/api/blob'))
const { data: tags, refresh: refreshTags } = useLazyAsyncData('tags', () => $fetch('/api/tag'))

const addFilterDescription = computed(() => {
  if (!selectedSource.value.name) {
    return 'Select a source'
  }
  if (!selectedTag.value.name) {
    return `Add all posts from ${selectedSource.value.name}`
  } else {
    return `Add all posts tagged ${selectedTag.value.name} from ${selectedSource.value.name}`
  }
})

async function addFilter() {
  const blobId = blob.id
  const sourceId = selectedSource.value.id
  const tagId = selectedTag.value.id
  try {
    await $fetch(`/api/blob/filter`, { method: 'POST', body: { blobId, sourceId, tagId } })
    const ret = await refreshBlobs()
    blob.filter.push()
  } catch (e) { }
}

const searchSource = async function (query) {
  loading = true
  query = query ? new URLSearchParams({ query }).toString() : ''
  sources.value = await $fetch(`/api/source?${query}`)
}
searchSource()

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
    if (await $confirm(`Are you sure to remove ${blob.name}`)) {
      await $fetch(`/api/blob/${blob.id}`, { method: 'DELETE' })
      await refreshBlobs()
    }
  } catch (e) {
    console.error(e)
  }
}

async function delFilter(filter) {
  try {
    const ret = await $fetch(`/api/filter/${filter.id}`, { method: 'DELETE' })
    await refreshBlobs()
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
    <i-card>
      <h2>{{$t('blob.create')}}</h2>
      <h6 class="text-grey-200">{{$t('blob.create_description')}}</h6>
      <main class='mt-1 mb-6'>

        <i-button @click='modalAddBlob=true' color='primary'>{{$t('blob.create')}}</i-button>
        
        <i-modal v-model='modalAddBlob' show-close>
          <template #header>
            {{$t('blob.create')}}
          </template>
          <section>
            <i-form @submit.prevent='addBlob'>
              <i-form-group>
                <i-form-label>{{$t('Name')}}</i-form-label>
                <i-input type='text' v-model='blob.name' :placeholder='$t("blob.what name?")' required/>
              </i-form-group>
              <i-form-group>
                <i-form-label>{{$t('Description')}}</i-form-label>
                <i-input type='text' label='Description' v-model='blob.description' :placeholder="$t('blob.what is it?')" required/>
              </i-form-group>
              <i-form-group class='text-right'>
                <i-button class="disabled:text-opacity-20" color='success'>{{$t('blob.create')}}</i-button>
              </i-form-group>
            </i-form>
          </section>
        </i-modal>

        <i-modal v-model='modalUseBlob' size='lg'>
          <template #header>
            {{$t('blob.edit')}}
          </template>
          <section>
            <i-form @submit.prevent='addFilter' v-if='blob.name'>
              <i-form-group>
                <i-form-label>{{$t('Source')}}</i-form-label>
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
              </i-form-group>

              <i-form-group>
                <i-form-label>{{$t('Tags')}}</i-form-label>
                <i-select autocomplete
                  @search='searchTag'
                  label='name'
                  :options='tags'
                  :loading='loading'
                  v-model='selectedTag'
                  :placeholder="$t('blob.Search for a source')"/>
              </i-form-group>

              <i-form-group class='text-right'>
                <i-button :disabled="!selectedSource?.name" v-html='addFilterDescription' color='success'></i-button>
              </i-form-group>
            </i-form>

            <i-table class='mt-3'>
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3">Source</th>
                  <th scope="col" class="px-6 py-3">Tag</th>
                  <th scope="col" class="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tr class="bg-white border-t" v-for='filter in blob.filter' :key='filter.id'>
                <td>
                  <nuxt-link :to='`/s/${filter.sourceId}`' v-text='filter.name' />
                </td>
                <td>{{filter.tag || 'All'}}</td>
                <td class='text-right'><i-button @click='delFilter(filter)'>Remove</i-button></td>
              </tr>
            </i-table>
          </section>
        </i-modal>

      </main>

      <h2>{{$t('Blob list')}}</h2>
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
                <i-button class='mr-1' @click='useBlob(blob)' size='sm' v-text="$t('Edit')" color='info'/>
                <i-button class='mr-1' @click='delBlob(blob)' size='sm' v-text="$t('Remove')" color='warning'/>
                <i-button :to='`/b/${blob.id}`' size='sm' v-text="$t('View')" color='primary'/>
              </td>
            </tr>
          </tbody>
        </i-table>
      </main>

    </i-card>
  </section>
</template>
