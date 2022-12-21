<script setup>
import { ref, computed, reactive } from 'vue'

const { $confirm } = useNuxtApp()

let blob = reactive({})

let source = ref(null)
let blobSources = ref([])

let modalAddBlob = ref(false)
let modalUseBlob = ref(false)

const { data: blobs, refresh: refreshBlobs } = useLazyAsyncData('blobs', () => $fetch('/api/blob'))


async function addBlob() {
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
    if (await $confirm(`Are you sure to remove ${blob.name}`)) {
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
  <section>
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
                <i-input type='text' v-model='blob.name' :placeholder='$t("blob.what name?")' required />
              </i-form-group>
              <i-form-group>
                <i-form-label>{{$t('Description')}}</i-form-label>
                <i-input type='text' label='Description' v-model='blob.description'
                  :placeholder="$t('blob.what is it?')" required />
              </i-form-group>
              <i-form-group class='text-right'>
                <i-button class="disabled:text-opacity-20" color='success'>{{$t('blob.create')}}</i-button>
              </i-form-group>
            </i-form>
          </section>
        </i-modal>

        <AdminBlobEditModal v-model='modalUseBlob' :blob='blob' />

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
                <i-button class='mr-1' @click='useBlob(blob)' size='sm' v-text="$t('Edit')" color='info' />
                <i-button class='mr-1' @click='delBlob(blob)' size='sm' v-text="$t('Remove')" color='warning' />
                <i-button :to='`/b/${blob.id}`' size='sm' v-text="$t('View')" color='primary' />
              </td>
            </tr>
          </tbody>
        </i-table>
      </main>

    </i-card>
  </section>
</template>
