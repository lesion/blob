<script setup>

// const openDialog = useModel('modelValue')
// console.error(openDialog)
const selectedTags = ref([])
const searchTag = ref('')
const { open, url } = defineProps({ url: String, open: Boolean })
const emit = defineEmits(['close'])

// defineEmits('update:modelValue')
// const { openDialog } = useModel()
// const { addURL } = useApi()

const { data: post, pending, error, refresh } = await useLazyFetch('/api/post/add', { method: 'POST', body: { URL: url } })

// tags
const query = computed(() => `/api/tag?query=${searchTag.value}`)
const { data: tags, pending: loadingTags } = useLazyFetch(query)

</script>
<template>
  <div>
    <span>{{ open }} {{ url }} {{ error }}</span>
    <v-dialog :modelValue="open" width="600" @update:modelValue="emit('close')">
      <v-card :loading="pending"> 
        <v-card-title>Adding url</v-card-title>
        <v-card-subtitle>{{ url }}</v-card-subtitle>
        <v-card-text v-if="!pending">

          <v-combobox v-model="selectedTags" multiple
            v-model:search='searchTag'
            :items="tags" :loading="loadingTags" item-value='id' item-title='name'
            label="tags" variant="outlined" chips closable-chips hide-no-data />

          <PostTest v-if='post' :post="post" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="warning" @click="emit('close')">Cancel</v-btn>
          <v-btn color="success">Ok</v-btn>
        </v-card-actions>
        <!-- <span>{{ url }}</span> -->
      </v-card>
    </v-dialog>
  </div>
</template>
