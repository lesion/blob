<script setup>

import { ref, computed, reactive } from 'vue'

const { blob, modelValue } = defineProps({ blob: Object, modelValue: Boolean })
const emit = defineEmits('update:modelValue', 'update:filter')

let selectedSource = ref([])
let selectedTag = ref([])
let loading = ref(false)
let tags = ref([])
let sources = ref([])


async function searchTag(query) {
  // query = query ? new URLSearchParams({ query }).toString() : ''
  tags.value = await $fetch(`/api/tag`, { query: { query, sources: selectedSource.value.map(s => s.id).join(',')}})
}
// searchTag()


const searchSource = async function (query) {
  loading.value = true
  // query = query ? new URLSearchParams({ query }).toString() : ''
  sources.value = await $fetch(`/api/source`, { query: { query } } )
  loading.value = false
}
searchSource()

async function addFilter() {
  const blobId = blob.id
  console.error(selectedSource.value)
  console.error(selectedTag.value)
  const sources = selectedSource.value.map(s => s.id )
  const tags = selectedTag.value.map(t => t.id)
  try {
    const filter = await $fetch(`/api/blob/filter`, { method: 'POST', body: { blobId, sources, tags } })
    console.error(filter)
    // const ret = await refreshBlobs()
    emit('update:filter')
    blob.filter.push(filter)
  } catch (e) { }
}


async function delFilter(filter) {
  try {
    const ret = await $fetch(`/api/filter/${filter.id}`, { method: 'DELETE' })
    emit('update:filter')
    // await refreshBlobs()
    // useBlob(blob)
    console.error(ret)
  } catch (e) {
    console.error(e)
  }
}


function stringifyFilter (filter) {
  const tags = filter.tags
  const sources = filter.sources.map(s => s.name).join(' OR ')

  if (tags && tags.length) {
    return 'Post from ' + sources + ' tagged ' + tags.map(t => t.name).join(', ')
  } else {
    return 'All posts from '  + sources
  }
}


</script>
<template>
  <v-dialog :modelValue='modelValue' @update:modelValue='ev => emit("update:modelValue", ev)' width='700'>
    <v-card>
    <v-card-title>{{$t('blob.edit')}} - {{blob.name}}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent='addFilter' v-show='blob?.name'>
        <v-row>
          <v-col>
          <v-autocomplete multiple chips closable-chips cache-items variant='outlined' @update:search='searchSource'
            hide-no-data hide-details
            :label='$t("Sources")' :items='sources' :loading='loading' item-value='id' item-title='name'
            v-model='selectedSource' return-object :placeholder="$t('blob.Search for a source')" />
          </v-col>
          <v-col>
            <v-autocomplete variant='outlined' return-object chips closable-chips multiple @update:search='searchTag' :label="$t('Tags')"
              :disabled='!selectedSource.length' :menu-props="{ maxHeight: 300 }"
              :items='tags' :loading='loading' item-value='id' item-title='name'
              v-model='selectedTag' :placeholder="$t('blob.Search for a source')" />
          </v-col>
        </v-row>
      </v-form>
      <v-btn :disabled="!selectedSource?.length" variant='outlined' @click='addFilter' color='indigo'>{{$t('blob.Add this filter')}}</v-btn>
    </v-card-text>
    <v-card-text>
        <strong>{{$t('Filters')}}</strong>
        <!-- <ul>
          <li v-for='filter in blob?.filter' :key='filter.id'> {{stringifyFilter(filter)}}</li>
        </ul> -->

      <v-table class='mt-3'>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">Sources</th>
            <th scope="col" class="px-6 py-3">Tags</th>
            <th scope="col" class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tr v-for='filter in blob?.filter' :key='filter.id'>
          <td>
            {{filter.sources.map(s => s.name || s.link).join(', ')}}
          </td>
          <td>{{filter.tags.map(t => t.name).join(', ') || 'All'}}</td>
          <td class='text-right'>
            <v-btn size='small' icon flat @click='delFilter(filter)'>
              <v-icon color='warning'>mdi-delete-forever</v-icon>
            </v-btn>
          </td>
        </tr>
      </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>
