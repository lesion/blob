<script setup>

let openDialog = ref(false)
const url = ref('')
const ret = ref({})

async function open (u) {
  url.value = u
  openDialog.value = true
  ret.value = await useLazyFetch('/api/post/add', { method: 'POST', body: { URL: url } })
}
defineExpose({ open })


// tags
const selectedTags = ref([])
const searchTag = ref('')
const query = computed(() => `/api/tag?query=${searchTag.value}`)
const { data: tags, pending: loadingTags } = useLazyFetch(query)

</script>
<template>
  <div>
    <span>{{ openDialog }} {{ url }}</span>
    <v-dialog v-model="openDialog" width="600">
      <v-card :loading="ret.pending"> 
        <v-card-title>Adding url</v-card-title>
        <v-card-subtitle>{{ url }}</v-card-subtitle>
        <v-card-text v-if="!ret.pending && ret.error">
          <v-alert icon='mdi-fire' color='error' :text="ret.error.toString()" ></v-alert>
        </v-card-text>
        <v-card-text v-if="!ret.pending && !ret.error">

          <v-combobox v-model="selectedTags" multiple
            v-model:search='searchTag'
            :items="tags" :loading="loadingTags" item-value='id' item-title='name'
            label="tags" variant="outlined" chips closable-chips hide-no-data />

          <PostTest v-if='ret.data' :post="ret.data" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="warning" @click="openDialog = false">Close</v-btn>
          <v-btn color="success" v-if="!ret.error">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
