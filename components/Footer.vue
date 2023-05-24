<script setup>
const { isLogged, authUser, initAuth, authLoading, logout } = useAuth()

</script>
<template>
  <v-footer app border class='bg-grey-lighten-3 pa-5' height="60px">
    <v-row justify="center">
      <v-btn variant="text" to='/'><v-icon>mdi-home</v-icon> Home</v-btn>
      <!-- <v-btn color='indigo mr-1' to='/source' v-show='user'><v-icon>mdi-text-box-multiple-outline</v-icon> Sources</v-btn> -->
      <!-- <v-btn color='indigo mr-1' to='/blob' v-show='user'><v-icon>mdi-alpha-b-box</v-icon> Blob</v-btn> -->
      <v-btn variant="text" to='/about'><v-icon>mdi-help-circle</v-icon> About</v-btn>
      <v-btn variant="text" to='/embed'><v-icon>mdi-widgets</v-icon> {{$t('Embed')}}</v-btn>
      <v-btn variant="text" to='/admin' v-show='isLogged'><v-icon>mdi-cog</v-icon> Admin</v-btn>
      <v-btn variant="text" to='/tag'><v-icon>mdi-tag</v-icon> Tags</v-btn>
      <v-btn variant="text" to='/blobs'><v-icon>mdi-tag</v-icon> Blobs</v-btn>
      <v-btn variant="text" @click='logout' v-show='isLogged'><v-icon>mdi-logout</v-icon> Logout</v-btn>
      <v-btn variant="text" to='/login' v-show='!isLogged'><v-icon>mdi-lock-open</v-icon> Login</v-btn>
    </v-row>
  </v-footer>
</template>