<script setup>
const { $notify } = useNuxtApp()
const { t } = useI18n()
const user = reactive({ username: '', password: '' })
const loading = ref(false)
const form = ref(false)

async function handleLogin() {
  const { login } = useAuth()
  try {
    loading.value = true
    await login(user)
    navigateTo('/admin')
  } catch (e) {
    $notify('Login error', 'error')
    loading.value = false
  }
}

function required (v) { return !!v || t('Field is required') }

</script>
<template>
  <v-card width='350' class='mt-5 mx-auto' :elevation='5'>
    <v-card-title>{{$t('login.signin')}}</v-card-title>
    <v-card-subtitle>{{$t('login.signin_description')}}</v-card-subtitle>
    <v-card-text>
      <v-form
        v-model="form"
        @submit.prevent="handleLogin">

        <v-text-field
          variant='outlined'
          v-model="user.username"
          :readonly="loading"
          :rules="[required]"
          class="my-4"
          clearable
          label="Email" />

        <v-text-field
          variant='outlined'
          v-model="user.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          class="my-4"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.password_placeholder')" />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="indigo"
          size="large"
          type="submit"
          variant="outlined">
          {{$t('login.signin')}}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
