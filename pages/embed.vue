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
  return `<blob-share blob=${blob.value && blob.value.id} sidebar="${sidebar.value?'true':'false'}" dark="${dark.value?'true':'false'}" ></blob-share>`
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

          <span>{{code}}</span>
          <div class='mt-6' v-if='blob.id'>
            <i-textarea v-model='code' readonly> </i-textarea>
            <p v-html='code' />
            <!-- <blob-share baseurl='http://localhost:3000' :blob='blob.id'></blob-share> -->
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
