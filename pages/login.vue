<template>
  <section class='p-6 shadow-md rounded max-w-sm mx-auto mt-6'>
    <form @submit.prevent='signIn' class='mb-4 flex flex-col'>
      <h3 class="font-mono text-2xl mb-3">Login</h3>
      <label class='block' for="email">E-mail:</label>
      <input type='email' class='block' name='email' id='email' v-model='email'>
      <label for="password" class='block'>Password</label>
      <input class='block' type='password' name='password' id='password' v-model='password'>
      <button class='' type='submit'>SignIn</button>
    </form>

  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signIn () {
      try {
        const { email, password } = this
        await this.$auth.loginWith('local', { data: { email, password } })
      } catch (err) {
        console.log(err)
      }
    }
  }  
}
</script>