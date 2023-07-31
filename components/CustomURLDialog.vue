<script setup>
const { $notify } = useNuxtApp()

let openDialog = ref(false)
const url = ref('')
const ret = ref({ pending: true })
const addRet = ref({ pending: false, error: '' })

// TODO: could be improved
async function open (u) {
  url.value = u
  openDialog.value = true
  addRet.value = { pending: false, error: '' }
  ret.value = await useLazyFetch('/api/post/getURL', { method: 'POST', body: { URL: url } })
}
defineExpose({ open })

const emit = defineEmits(['added'])

async function addPost () {
  try {
    addRet.value = await useLazyFetch('/api/post/addURL', { method: 'POST', body: { URL: url, tags: selectedTags } })
    openDialog.value = false
    addRet.value = { pending: false, error: '' }
    $notify('Post added', 'success')
    emit('added', addRet.value.data)
  } catch (e) {
    console.error(e)

  }
}

// tags
const selectedTags = ref([])
const searchTag = ref('')
const query = computed(() => `/api/tag?query=${searchTag.value}&limit=10`,)
const { data: tags = [], pending: loadingTags } = await useLazyFetch(query)

</script>
<template>
  <div>
    <v-dialog v-model="openDialog" width="700">
      <v-card :loading="ret.pending || addRet.pending"> 
        <v-card-title>{{ $t('post.add_custom') }}</v-card-title>
        <v-card-subtitle>{{ $t('post.add_custom_post_description') }} <br/> {{ url }}</v-card-subtitle>
        <v-card-text v-if="!ret.pending && ret.error">
          <v-alert icon='mdi-fire' color='error' :text="ret.error.toString()" ></v-alert>
        </v-card-text>
        <v-card-text v-if="!ret.pending && !ret.error">
          <Post v-if='ret.data' :post="ret.data" preview/>
          <v-card-subtitle class="pa-0 mt-4">{{ $t('post.add_custom_post_tag_description')}}</v-card-subtitle>
          <v-combobox v-model="selectedTags" multiple
            v-model:search='searchTag'
            :items="tags" :loading="loadingTags" item-value='id' item-title='name'
            label="tags" variant="outlined" chips closable-chips hide-no-data />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="warning" @click="openDialog = false">{{ $t('Close')}}</v-btn>
          <v-btn color="success" v-if="!ret.error" @click="addPost" :loading="addRet.pending">{{ $t('Add') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
