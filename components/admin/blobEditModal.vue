<script setup>

const { blob, modelValue } = defineProps({ blob: Object, modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'update:filter'])

let selectedSource = ref([])
let selectedTag = ref([])
let loadingTag = ref(false)
let loadingSource = ref(false)
let loading = ref(false)
let inclusive = ref(false)

let tags = ref([])
let sources = ref([])


async function searchTag(query) {
  loadingTag.value = true
  tags.value = await $fetch(`/api/tag`, { query: { ...(query && { query }), sources: selectedSource.value.map(s => s.id).join(',')}})
  loadingTag.value = false
}

const searchSource = async function (query) {
  loadingSource.value = true
  sources.value = await $fetch(`/api/source`, { query: { query } } )
  loadingSource.value = false
}

searchSource()

async function addFilter() {
  loading.value = true
  const blobId = blob.id
  const sources = selectedSource.value.map(s => s.id )
  const tags = selectedTag.value.map(t => t.name || t)

  // check if this filter already exists
  // const alreadyExists = blob.filter(f => eq(sources, ))

  try {
    const filter = await $fetch(`/api/blob/filter`, { method: 'POST', body: { blobId, sources, tags, inclusive: inclusive.value } })
    emit('update:filter')
    blob.filter.push(filter)
    selectedSource.value = []
    selectedTag.value = []
    inclusive.value = false
  } catch (e) { }
  loading.value = false
}

async function delFilter(filter) {
  try {
    const ret = await $fetch(`/api/filter/${filter.id}`, { method: 'DELETE' })
    emit('update:filter')
    blob.filter = blob.filter.filter(f => f.id !== filter.id)
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
  <v-dialog :modelValue='modelValue' @update:modelValue='ev => emit("update:modelValue", ev)' width='1000'>
    <v-card>
    <v-card-title>{{$t('blob.edit')}} - {{blob.name}}</v-card-title>
    <v-card-text>
      <v-form v-show='blob?.name'>
        <v-row>
          <v-col>
            <v-autocomplete multiple chips closable-chips cache-items variant='outlined' @update:search='searchSource' @update:modelValue='$nextTick( () => searchTag())'
              hide-no-data hide-details
              :label='$t("Sources")' :items='sources' :loading='loadingSource' item-value='id' item-title='name' item-subtitle='description'
              v-model='selectedSource' return-object :placeholder="$t('blob.Search for a source')">
              <template v-slot:item="{ item, props }">
                <v-list-item :key='item.value.id' v-bind='props'>
                  <template v-slot:prepend>
                    <v-checkbox-btn :model-value='selectedSource.map(s => s.id).includes(item.value.id)' />
                  </template>
                  <template v-slot:subtitle>{{item.value.description}}</template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-combobox dense variant='outlined' return-object chips closable-chips multiple @update:search='searchTag' :label="$t('Tags')"
              :menu-props="{ maxHeight: 300 }" hide-no-data
              :items='tags' :loading='loadingTag' item-value='id' item-title='name'
              v-model='selectedTag' :placeholder="$t('blob.Search for tags')" />
          </v-col>
          <v-col v-if='selectedTag.length>1' cols="3">
            <v-switch v-model='inclusive' inset :label="$t('blob.match all tags')" color='primary'/>
          </v-col>
        </v-row>
      </v-form>
      <v-btn class='mt-2' :disabled="loading" variant='outlined' :loading='loading' @click='addFilter' color='indigo'>{{$t('blob.Add this filter')}}</v-btn>
    </v-card-text>
    <v-card-text v-show='blob?.filter?.length'>
      <v-card-title>{{$t('Filters')}}</v-card-title>
      <v-table>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">{{$t('Sources')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Tags')}}</th>
            <th scope="col" class="px-6 py-3 text-right">{{$t('Match all tags')}}</th>
            <th scope="col" class="px-6 py-3 text-right">{{$t('Actions')}}</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for='filter in blob?.filter' :key='filter.id' class='border-t'>
          <th class='row'>
            <v-chip v-for='source in filter.sources' :key='source.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{source.name || source.link}}</v-chip>
          </th>
          <td>
            <v-chip v-for='tag in filter.tags' :key='tag.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
          </td>
          <td class='text-right'>
            <v-icon v-if='filter.inclusive' color='green'>mdi-check</v-icon>
            <v-icon v-else>mdi-tilde</v-icon>
          </td>
          <td class='text-right'>
            <v-btn icon flat @click='delFilter(filter)'>
              <v-icon color='warning'>mdi-delete-forever</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click='emit("update:modelValue", false)' >{{$t('Done')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
