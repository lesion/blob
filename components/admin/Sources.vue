<script setup>
const { $confirm, $notify, $prompt } = useNuxtApp()

let url = ref('')
let error = ref('')
let loading = ref(false)

const { pending, data: sources, refresh: refreshSources } = useLazyFetch('/api/source')

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

async function edit (source) {
  const name = await $prompt(`You can change '${source.name}'`, 'info', 'Name')
  console.error(name)
  if (!name) return
  try {
    await $fetch(`/api/source/${source.id}`, { method: 'PUT', body: { name } })
    refreshSources()
  } catch (e) {
    console.error('nono')
  }
}


const headers = [
  {
    align: 'start',
    key: 'name',
    title: 'Name',
  },
  { title: 'Info', key: 'link' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', align: 'end' },
]


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
  <v-container v-if="!pending">
    <form @submit.prevent="addSource">
      <v-text-field v-model='url' color='indigo' persistent-hint :hint="$t('source.title')" variant='outlined' label='URL' required :loading='loading' :disabled='loading'>
        <template v-slot:append-inner>
          <v-progress-circular v-if='loading' indeterminate />
          <v-icon v-else>mdi-plus</v-icon>
        </template>
      </v-text-field>
    </form>
    
    <v-card-title class="mt-5">{{$t('Source list')}}</v-card-title>
    <v-data-table density='dense'
    :headers="headers"
    :items="sources" >
      <template v-slot:item.actions="{ item: { raw: source } }">
        <v-btn class='mr-1' variant='text' @click='edit(source)' color='primary' icon='mdi-pencil' />
        <v-btn class='mr-1' variant='text' :to='`/s/${source.id}`' color='success' icon='mdi-eye' />
        <v-btn class='mr-1' variant='text' @click='remove(source)' icon='mdi-delete' color='warning'/>        
      </template>
    </v-data-table>
</v-container>
</template>