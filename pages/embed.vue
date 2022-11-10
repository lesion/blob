<script setup>
import { ref, computed, reactive } from 'vue'

let blob = ref({})
let blobs = ref([])
let loading = ref(true)
let sidebar = ref(true)
let dark = ref(true)
let max = ref(10)

const searchBlob = async function (query) {
  loading = true
  query = query ? new URLSearchParams({ query }).toString() : ''
  blobs.value = await $fetch(`/api/blob?${query}`)
}
searchBlob()

const code = computed(() => {
  return `<blob-share blob=${blob.value.id} ${sidebar.value?'sidebar':''} ${dark.value?'dark':''}/>`
})

</script>
<template>
<section>
  <i-card>
    <h2 class='card-title'>Embed to your website</h2>
    <p class='prose-h1'>
    In <strong>Blob</strong> sharing is a first class citizen.
    We believe that information bla bli ble nanana sharing nanan pippone.<br/>
    </p>
    <p>
      <i-form>
        <i-form-group>
          <i-form-label>{{$t('Blob')}}</i-form-label>
          <i-select autocomplete
            @search='searchBlob'
            label='name'
            :options='blobs'
            :loading='loading'
            v-model='blob'
            :placeholder="$t('blob.Blob to embed')">
            <!-- <template #option='{ option } '>
              <strong>{{option.name}}</strong>
              <div v-text='option.description'></div>
            </template> -->
          </i-select>
        </i-form-group>
        <i-form-group>
          <i-toggle v-model="dark">Dark mode</i-toggle>
        </i-form-group>
        <i-form-group>
          <i-toggle v-model="sidebar">Sidebar</i-toggle>
        </i-form-group>
      </i-form>

      <span>{{blob.id}}</span>
      <div class='mt-6' v-if='blob.id'>
        <i-textarea v-model='code' readonly> </i-textarea>
        <p v-html='code' />
        <!-- <blob-share baseurl='http://localhost:3000' :blob='blob.id'></blob-share> -->
      </div>

    </p>
  </i-card>
</section>
</template>
