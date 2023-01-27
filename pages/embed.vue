<script setup>

const config = useRuntimeConfig()
setPageLayout('default')

let sidebar = ref(true)
let dark = ref(false)

let blob = ref()
let blobs = ref([])
let active = ref('website')
let loading = ref(false)
let max = ref(10)

const searchBlob = async function (query = '') {
  loading.value = true
  blobs.value = await $fetch(`/api/blob`, { query: { query }})
  loading.value = false
}
searchBlob()

const code = computed(() => {
  if (blob.value && blob.value.id) {
    return `
      <script src="${config.public.baseURL}/blob-share.js" async defer></sc` + `ript>
      <blob-share blob="${blob.value && blob.value.id}" sidebar="${!!sidebar.value}" dark="${!!dark.value}"></blob-share>
    `
  }
  return ''
})

</script>

<template>
    <v-container>
      <v-card-title>{{$t('embed.title')}}</v-card-title>
      <v-card-subtitle v-html="$t('embed.description')" />
      <v-card-text>
        <v-form>
            <v-row>
              <v-col sm=6 md=5 lg=4>
                <client-only>
                  <v-autocomplete variant='outlined' color='indigo' @update:search='searchBlob' :label="$t('Blob')" name='blob'
                    :items='blobs' :loading='loading' v-model='blob' item-value='id' item-title='name' hide-no-data hide-details return-object
                    :placeholder="$t('blob.Blob to embed')">
                    <template v-slot:item="{props, item}">
                      <v-list-item v-bind='props' :title='item.raw.name' :subtitle='item.raw.description' />
                    </template>
                  </v-autocomplete>
                </client-only>
              </v-col>
            </v-row>
        </v-form>
      </v-card-text>
      <v-card>
      <v-tabs v-model='active'>
          <v-tab value='website'>{{$t('Website')}}</v-tab>
          <v-tab value='wordpress'>Wordpress</v-tab>
          <v-tab value='grav'>Grav</v-tab>
          <v-tab value='advanced'>Advanced</v-tab>
      </v-tabs>
        <v-card-text>
          <v-window v-model='active'>
            <v-window-item active value='website'>
              <v-form>
                  <v-switch color='indigo' hide-details inset v-model="dark" label='Dark mode' />
                  <v-switch color='indigo' inset v-model="sidebar" label='Sidebar '/>

                <div class='mt-6' v-show='blob?.id'>
                  <v-textarea class='text-italic text-body-1' variant='outlined' v-model='code' readonly />
                  <v-sheet class='pa-6 rounded' :color='!dark ? "white" : "#222"'>
                    <blob-share :blob='blob?.id' :sidebar='sidebar' :dark='dark'></blob-share>
                  </v-sheet>
                </div>
              </v-form>
            </v-window-item>
            <v-window-item value='wordpress'>
              wordpress
            </v-window-item>
            <v-window-item value='grav'>
              grav
            </v-window-item>
            <v-window-item value='advanced'>
              <strong>API</strong>
            </v-window-item>            
          </v-window>
        </v-card-text>
      </v-card>
    </v-container>
</template>
