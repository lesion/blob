<script setup>

const user = reactive({ username: '', password: '' })

function handleLogin() {
  const { login } = useAuth()
  login(user)
}

const isLoginDisabled = computed( () => !user.username || !user.password )

</script>
<template>
  <i-card class='max-w-sm mx-auto mt-6'>
    <h3 class="text-2xl mb-4" v-text='$t("login.title")' />
    <i-form @submit.prevent='handleLogin'>
      <i-form-group>
        <i-form-label v-text='$t("login.username")' />
        <i-input type='text' name='username' id='username' v-model='user.username' autofocus />
      </i-form-group>

      <i-form-group>
        <i-form-label v-text='$t("login.password")' />
        <i-input type='password' name='password' id='password' v-model='user.password' autofocus />
      </i-form-group>

      <p>c: {{isLoginDisabled}} </p>
      <i-form-group>
        <i-button color='success' outline type='submit' :disabled='isLoginDisabled'> c {{$t('login.signin')}} </i-button>
      </i-form-group>
    </i-form>

  </i-card>
</template>
