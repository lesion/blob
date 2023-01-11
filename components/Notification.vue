<script setup>
const { $on, $emit } = useNuxtApp()

$on('notify', showNotification)

let msg = ref('')
let visible = ref(false)
let status = ref('warning')

function showNotification (ev) {
  msg.value = ev.msg
  status.value = ev.status
  visible.value = true
}

</script>
<template>
  <v-snackbar :color='status' v-model='visible' timeout='5000'><v-icon>mdi-alert-circle-outline</v-icon> {{msg}}</v-snackbar>
</template>