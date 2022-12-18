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
  <i-modal v-model='visible' color='warning'>
    <span v-html='msg' />
    <template #footer>
      <div class='text-right'>
        <i-button class='mr-1' @click='result(false)' color='info'>{{$t("Cancel")}}</i-button>
        <i-button @click='result(true)' color='success'>{{$t("Ok")}}</i-button>
      </div>
    </template>
  </i-modal>
</template>