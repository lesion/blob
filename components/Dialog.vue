<script setup>
const { $on, $emit } = useNuxtApp()
const type = ref('confirmDialog') // prompt
$on('confirmDialog', confirmDialog)

$on('promptDialog', promptDialog)

let msg = ref('')
let visible = ref(false)
const userInput = ref('')
const name = ref('')

function confirmDialog (ev) {
  type.value = 'confirmDialog'
  msg.value = ev.msg
  visible.value = true
}

function promptDialog (ev) {
  type.value = 'promptDialog'
  msg.value = ev.msg
  name.value = ev.name
  visible.value = true
}

function result (value) {
  visible.value = false
  if (type.value === 'confirmDialog') {
    console.error('dentro result confirm dialog ', value)
    $emit('confirmDialog:result', value)
  } else {
    $emit('promptDialog:result', value && userInput.value )
  }
}

</script>
<template>
  <v-dialog v-model='visible' color='warning' width='400'>
    <v-card>
      <v-card-title>Confirm</v-card-title>
      <v-card-text>
        <div v-html='msg' />
        <v-text-field v-if='type === "promptDialog"' variant='outlined' :label='name' v-model='userInput'></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class='mr-1' @click='result(false)' color='info'>{{$t("Cancel")}}</v-btn>
        <v-btn @click='result(true)' color='success'>{{$t("Ok")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
