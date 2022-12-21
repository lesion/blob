<script setup>

import { ref, computed, reactive } from 'vue'

const { blob } = defineProps({ blob: Object })

let selectedSource = ref({})
let selectedTag = ref({})
let loading = ref(true)
let tags = ref([])
let sources = ref([])


async function searchTag(query) {
  query = query ? new URLSearchParams({ query }).toString() : ''
  tags.value = await $fetch(`/api/tag?${query}`)
}

const searchSource = async function (query) {
  loading = true
  query = query ? new URLSearchParams({ query }).toString() : ''
  sources.value = await $fetch(`/api/source?${query}`)
}

async function addFilter() {
  console.error('sono dentro add Filter')
  const blobId = blob.id
  const sourceId = selectedSource.value.id
  const tagId = selectedTag.value.id
  try {
    const filter = await $fetch(`/api/blob/filter`, { method: 'POST', body: { blobId, sourceId, tagId } })
    console.error(filter)
    // const ret = await refreshBlobs()
    blob.filter.push(filter)
  } catch (e) { }
}


const addFilterButtonDescription = computed(() => {
  if (!selectedSource.value.name) {
    return 'Select a source'
  }
  if (!selectedTag.value.name) {
    return `Add all posts from ${selectedSource.value.name}`
  } else {
    return `Add all posts tagged ${selectedTag.value.name} from ${selectedSource.value.name}`
  }
})

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

</script>
<template>
  <i-modal v-model='modalUseBlob' size='lg'>
    <template #header>
      {{$t('blob.edit')}}
    </template>
    <section>
      <i-form @submit.prevent='addFilter' v-if='blob.name'>
        <i-form-group>
          <i-form-label>{{$t('Source')}}</i-form-label>
          <i-select autocomplete @search='searchSource' label='name' :options='sources' :loading='loading'
            v-model='selectedSource' :placeholder="$t('blob.Search for a source')">
            <template #option='{ option } '>
              <strong>{{option.name}}</strong>
              <div v-text='option.description'></div>
            </template>
          </i-select>
        </i-form-group>

        <i-form-group>
          <i-form-label>{{$t('Tags')}}</i-form-label>
          <i-select autocomplete @search='searchTag' label='name' :options='tags' :loading='loading'
            v-model='selectedTag' :placeholder="$t('blob.Search for a source')" />
        </i-form-group>

        <i-form-group class='text-right'>
          <i-button :disabled="!selectedSource?.name" v-html='addFilterButtonDescription' color='success'>
          </i-button>
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
          <td class='text-right'>
            <i-button size='sm' link color='danger' @click='delFilter(filter)'>
              <i-icon name="ink-times" />
              Remove
            </i-button>
          </td>
        </tr>
      </i-table>
    </section>
  </i-modal>

</template>
