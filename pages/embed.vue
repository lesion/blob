<script setup>

let sidebar = ref(true)
let dark = ref(true)

let blob = ref({})
let blobs = ref([])
let active = ref('website')
let loading = ref(true)
let max = ref(10)

const searchBlob = async function (query) {
  loading = true
  query = query ? new URLSearchParams({ query }).toString() : ''
  blobs.value = await $fetch(`/api/blob?${query}`)
}
searchBlob()

const code = computed(() => {
  return `<blob-share blob=${blob.value && blob.value.id} ${sidebar.value?'sidebar':''} ${dark.value?'dark':''} ></blob-share>`
})


</script>

<template>

<section>
  <i-card>
    <h2 class='card-title'>{{$t('embed.title')}}</h2>
    <p class='prose-h1' v-html="$t('embed.description')" />

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
      </i-form>
    </p>

    <i-tabs v-model='active'>
      <template #header>
        <i-tab-title for='website'>{{$t('Website')}}</i-tab-title>
        <i-tab-title for='wordpress'>{{$t('Wordpress')}}</i-tab-title>
        <i-tab-title for='grav'>{{$t('Grav')}}</i-tab-title>
      </template>

      <i-tab name='website'>
        <i-form>
          <i-form-group>
            <i-toggle v-model="dark">Dark mode</i-toggle>
          </i-form-group>
          <i-form-group>
            <i-toggle v-model="sidebar">Sidebar</i-toggle>
          </i-form-group>

          <div class='mt-6' v-if='blob.id'>
            <i-textarea class='mb-6' v-model='code' readonly> </i-textarea>
            <br/><span>{{sidebar}}</span>
            <blob-share :blob='blob.id' :sidebar='sidebar' :dark='dark'></blob-share>
          </div>
        </i-form>
      </i-tab>
      <i-tab name='wordpress'>
        wordpress
      </i-tab>
      <i-tab name='grav'>
        grav
      </i-tab>
    </i-tabs>

  </i-card>
</section>
</template>
