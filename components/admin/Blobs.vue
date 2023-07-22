<script setup>
import { ref, computed, reactive } from 'vue'

const { $confirm } = useNuxtApp()

let blob = reactive({ sortBy: 'date' })
// let Blob = reactive({})
// let source = ref(null)
// let blobSources = ref([])

let validAddBlobForm = ref(false)
let modalAddBlob = ref(false)
let modalUseBlob = ref(false)

const { pending, data: blobs = [], refresh: refreshBlobs } = await useLazyFetch('/api/blob')

function createBlob () {
  delete blob.id
  blob.name = ''
  blob.description = ''  
  modalAddBlob.value = true
}

async function addBlob() {
  if (!validAddBlobForm) { return }
  try {
    const ret = await $fetch(`/api/blob`, {
      method: 'POST',
      body: { name: blob.name, description: blob.description }
    })
    await refreshBlobs()
    modalAddBlob.value = false
    blob.name = ''
    blob.description = ''
    useBlob(ret)

  } catch (e) {
    console.error(e)
  }
}

async function delBlob(blob) {
  try {
    if (await $confirm(`Are you sure to remove the blob <u>${blob.name}</u>?`)) {
      await $fetch(`/api/blob/${blob.id}`, { method: 'DELETE' })
      await refreshBlobs()
    }
  } catch (e) {
    console.error(e)
  }
}

async function moveUp(blob) {
  try {
    await $fetch(`/api/blob/up?blobIndex=${blob.ord}`)
    await refreshBlobs()
  } catch (e) {
    console.error(e)
  }
}

function useBlob(c) {
  modalUseBlob.value = true
  blob.id = c.id
  blob.name = c.name
  blob.description = c.description
  blob.filter = c.Filter?.map(f => ({
    id: f.id,
    inclusive: f.inclusive,
    sources: f.sources,
    tags: f.tags
  })) || []
}

async function pin (blob) {
  try {
    await $fetch(`/api/blob/${blob.id}`, { method: 'PUT', body: { pin: !blob.pin} })
    blob.pin = !blob.pin
  } catch (e) {
    console.error(e)
  }
}

async function editBlob (b) {
  try {
    blob.name = b.name
    blob.description = b.description
    blob.sortBy = b.sortBy
    blob.sortAsc = b.sortAsc
    blob.id = b.id
    modalAddBlob.value = true
  } catch (e) {
    console.error(e)
  }
}

async function updateBlob () {
  try {
    await $fetch(`/api/blob/${blob.id}`, { method: 'PUT', body: { name: blob.name, description: blob.description, sortBy: blob.sortBy, sortAsc: blob.sortAsc } })
    modalAddBlob.value = false
    await refreshBlobs()
  } catch (e) {
    console.error(e)
  }
}

</script>
<template>
  <v-container>
      <span class="text-grey-200">{{$t('blob.description')}}</span>
      <main class='mt-1 mb-6'>
        <v-btn variant='text' text @click='createBlob' color='indigo'>{{$t('blob.create')}}</v-btn>

        <v-dialog v-model='modalAddBlob' width='400'>
          <v-card>
            <v-card-title>{{$t(!blob.id ? 'blob.create' : 'blob.edit')}}</v-card-title>
            <v-form v-model='validAddBlobForm' @submit.prevent='() => blob.id ? updateBlob() : addBlob()'>
              <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field variant='outlined' type='text' v-model='blob.name' :placeholder='$t("blob.what name?")' :label="$t('Name')" required/>
                </v-col>
                <v-col cols=12>
                  <v-text-field variant='outlined' type='text' :label="$t('Description')" v-model='blob.description'
                  :placeholder="$t('blob.what is it?')" required />
                </v-col>
                <v-col cols=6>
                  <v-select variant='outlined' label='Sort by' :items="['date', 'title']" v-model='blob.sortBy'></v-select>
                </v-col>
                <v-col cols=6>
                  <v-switch inset color='primary' label='Ascending order' v-model='blob.sortAsc' />
                </v-col>
              </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='warning' @click='modalAddBlob = false'>{{$t('Cancel')}}</v-btn>
                <v-btn type='submit' color='indigo'>{{$t(blob.id ? 'Save' : 'blob.create')}}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <AdminBlobEditModal v-model='modalUseBlob' :blob='blob' @update:filter='refreshBlobs' />

      </main>

      <v-card-title>{{$t('Blob list')}}</v-card-title>
      <v-table :loading='pending' density='dense'>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">{{$t('Name')}}</th>
            <th scope="col" class="px-6 py-3">{{$t('Filters')}}</th>
            <th scope="col" class="px-6 py-3 text-left">{{$t('Pin')}}</th>
            <th scope="col" class="px-6 py-3 text-right" style="width: 200px;">{{$t('Actions')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(blob, idx) in blobs' :key='blob.id'>
            <th scope="row"><nuxt-link :to='`/b/${blob.id}`'>{{blob.name}}</nuxt-link><div class='text-body-2'>{{blob.description}}</div></th>
            <td>
              <div v-for='filter in blob.Filter' :key='filter.id'>
                <v-chip v-for='source in filter.sources' :key='source.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{source.name}}</v-chip>
                <v-chip v-for='tag in filter.tags' :key='tag.id' label variant='outlined' size='small' :color='filter.inclusive ? "red": "indigo"' class='mr-1 mt-1'>{{tag.name}}</v-chip>
              </div>
            </td>
            <td>
              <v-switch inset :model-value="blob.pin" color="primary" @update:model-value="pin(blob)"/>
            </td>
            <td class="px-6 py-4 text-right" width="300px">
              <v-btn v-if='idx > 0' class='mr-1' variant='text' @click='moveUp(blob)' icon='mdi-chevron-up' color='info' />
              <v-btn class='mr-1' variant='text' @click='editBlob(blob)' icon='mdi-cog' color='info' />
              <v-btn class='mr-1' variant='text' @click='useBlob(blob)' icon='mdi-pencil' color='info' />
              <v-btn class='mr-1' variant='text' @click='delBlob(blob)' icon='mdi-delete' color='warning'/>
            </td>
          </tr>
        </tbody>
      </v-table>
  </v-container>
</template>
