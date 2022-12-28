<script setup>
let sidebar = ref(true)
let dark = ref(true)

const ret = defineProps({ blob: Object })
console.error(ret)
const code = computed(() => {
  console.error('sono qui dentro ! ', blob.value && blob.value.id )
  return 'ciao'
  // return `<blob-share ${blob && blob.id} ${sidebar.value?'sidebar':''} ${dark.value?'dark':''}/>`
})


</script>
<template>
  <v-card>
    <p>{{code}}</p>
    <v-form>
        <v-switch v-model="dark">Dark mode</v-switch>
        <v-switch v-model="sidebar">Sidebar</v-switch>

      <span>{{code}}</span>
        <v-textarea v-model='code' readonly> </v-textarea>
        <p v-html='code' />
    </v-form>
  </v-card>
</template>