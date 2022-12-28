<script setup>
const { $on, $emit } = useNuxtApp()

$on('confirmDialog', confirmDialog)

let msg = ref('')
let visible = ref(false)

function confirmDialog (ev) {
  msg.value = ev.msg
  visible.value = true
}

function result (value) {
  visible.value = false
  $emit('confirmDialog:result', value)
}

</script>
<template>
  <v-dialog v-model='visible' color='warning' width='400'>
    <v-card>
      <v-card-title>Confirm</v-card-title>
      <v-card-text v-html='msg' />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class='mr-1' @click='result(false)' color='info'>{{$t("Cancel")}}</v-btn>
        <v-btn @click='result(true)' color='success'>{{$t("Ok")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>