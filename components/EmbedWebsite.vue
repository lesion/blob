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
  <i-card>
    <p>{{code}}</p>
    <i-form>
      <i-form-group>
        <i-toggle v-model="dark">Dark mode</i-toggle>
      </i-form-group>
      <i-form-group>
        <i-toggle v-model="sidebar">Sidebar</i-toggle>
      </i-form-group>

      <span>{{code}}</span>
      <!-- <div class='mt-6' v-if='blob.id'> -->
        <i-textarea v-model='code' readonly> </i-textarea>
        <p v-html='code' />
        <!-- <blob-share baseurl='http://localhost:3000' :blob='blob.id'></blob-share> -->
      <!-- </div> -->
    </i-form>
  </i-card>
</template>