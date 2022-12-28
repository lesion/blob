<script setup>
import { ref, computed, reactive } from 'vue'

const { $confirm } = useNuxtApp()

let blob = reactive({})

let source = ref(null)
let blobSources = ref([])

let validAddBlobForm = ref(false)
let modalAddBlob = ref(false)
let modalUseBlob = ref(false)

const { data: blobs, refresh: refreshBlobs } = useAsyncData('blobs', () => $fetch('/api/blob'))


async function addBlob() {
  if (!validAddBlobForm) { return }
  try {
    const ret = await $fetch(`/api/blob`, {
      method: 'POST',
      body: { name: blob.name, description: blob.description }
    })
    await refreshBlobs()
    modalAddBlob.value = false
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

function useBlob(c) {
  modalUseBlob.value = true
  blob.id = c.id
  blob.name = c.name
  blob.description = c.description
  blob.filter = c.Filter //?.map(f => ({
  //   id: f.id,
  //   sourceId: f.sourceId,
  //   name: f.source.name,
  //   link: f.source.link,
  //   description: f.source.description,
  //   tag: f.tag?.name
  // }))
}

async function updateFilter () {
  console.error('dentro update filter')
  await refreshBlobs()
  useBlob(blob)
}

</script>
<template>
  <v-container>
      <v-card-title>{{$t('Blob')}}</v-card-title>
      <span class="text-grey-200">{{$t('blob.create_description')}}</span>

      <main class='mt-1 mb-6'>

        <v-btn variant='outlined' @click='modalAddBlob=true' color='indigo'>{{$t('blob.create')}}</v-btn>

        <v-dialog v-model='modalAddBlob' width='400'>
          <v-card>
            <v-card-title>{{$t('blob.create')}}</v-card-title>
            <v-form v-model='validAddBlobForm' @submit.prevent='addBlob'>
              <v-card-text>
              <v-row>
                <v-col cols=12>
                <v-text-field variant='outlined' type='text' v-model='blob.name' :placeholder='$t("blob.what name?")' :label="$t('Name')" required/>
                </v-col>
                <v-col>
                <v-text-field variant='outlined' type='text' :label="$t('Description')" v-model='blob.description'
                  :placeholder="$t('blob.what is it?')" required />
                  </v-col>
              </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type='submit' color='indigo' variant='outlined'>{{$t('blob.create')}}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <AdminBlobEditModal v-model='modalUseBlob' :blob='blob' @update:filter='updateFilter' />

      </main>

      <h2>{{$t('Blob list')}}</h2>
      <main class='mt-2'>

        <v-table>
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Filters</th>
              <th scope="col" class="px-6 py-3 text-right" style="width: 200px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-t" v-for='blob in blobs' :key='blob.id'>
              <th scope="row"><nuxt-link :to='`/b/${blob.id}`'>{{blob.name}}</nuxt-link><div class='text-body-2'>{{blob.description}}</div></th>
              <td>
                <div v-for='filter in blob.Filter' :key='filter.id'>
                  <v-chip v-for='source in filter.sources' :key='source.id' label variant='outlined' size='small' class='mr-1 mt-1'>{{source.name}}</v-chip>
                  ({{filter.tags.map(t => t.name).join(', ') ||
                'All'}})</div>
              </td>
              <td class="px-6 py-4 text-right">
                <v-btn class='mr-1' variant='outlined' @click='useBlob(blob)' size='small' v-text="$t('Edit')" color='info' />
                <v-btn class='mr-1' variant='outlined' @click='delBlob(blob)' size='small' v-text="$t('Remove')" color='warning' />
                <!-- <v-btn :to='`/b/${blob.id}`' variant='outlined' size='small' v-text="$t('View')" color='primary' /> -->
              </td>
            </tr>
          </tbody>
        </v-table>
      </main>
  </v-container>
</template>
