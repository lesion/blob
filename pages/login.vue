<script setup>
const { $notify } = useNuxtApp()

const user = reactive({ username: '', password: '' })
const loading = ref(false)
const form = ref(false)

async function handleLogin() {
  const { login } = useAuth()
  try {
    await login(user)
    const router = useRouter()
    router.push('/')
  } catch (e) {
    $notify('Login error')
  }
}

function required (v) { return !!v || 'Field is required' }

const isLoginDisabled = computed( () => !user.username || !user.password )

</script>
<template>
  <v-card width='350' class='mt-5 mx-auto' :elevation='5'>
    <v-card-title>Login</v-card-title>
    <v-card-subtitle>Insert your login information</v-card-subtitle>
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
          label="Password"
          placeholder="Enter your password" />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="indigo"
          size="large"
          type="submit"
          variant="outlined">
          Sign In
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
