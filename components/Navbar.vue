<script setup>
const { useAuthUser, logout } = useAuth()
const user = useAuthUser()

const sidebar = ref(false)

</script>
<template>
  <v-toolbar dark flat extended color='white'>
    <v-img src='/api/media/logo' max-height='120' to='/' class='mt-6'/>
    <v-spacer></v-spacer>
    <v-btn color='indigo mr-1' to='/'><v-icon>mdi-home</v-icon> Home</v-btn>
    <!-- <v-btn color='indigo mr-1' to='/source' v-show='user'><v-icon>mdi-text-box-multiple-outline</v-icon> Sources</v-btn> -->
    <!-- <v-btn color='indigo mr-1' to='/blob' v-show='user'><v-icon>mdi-alpha-b-box</v-icon> Blob</v-btn> -->
    <v-btn color='indigo mr-1' to='/embed'><v-icon>mdi-widgets</v-icon> Embed</v-btn>
    <v-btn color='indigo mr-1' to='/help'><v-icon>mdi-help-circle</v-icon> Help</v-btn>
    <v-btn color='indigo mr-1' to='/admin' v-show='user'><v-icon>mdi-cog</v-icon> Admin</v-btn>
    <v-btn color='indigo mr-1' @click='logout' v-show='user'><v-icon>mdi-logout</v-icon> Logout</v-btn>
    <v-btn color='indigo' to='/login' v-show='!user'><v-icon>mdi-lock-open</v-icon> Login</v-btn>
  </v-toolbar>

</template> 