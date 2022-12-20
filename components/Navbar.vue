<script setup>
const { useAuthUser, logout } = useAuth()
const user = useAuthUser()

</script>
<template>
  <p>User {{user}}</p>
  <i-navbar class='gap-2'>
    <i-navbar-brand to="/">Blob</i-navbar-brand>
    <i-navbar-collapsible class="flex-end">
      <i-nav class='gap-2'>
        <i-nav-item to='/source'>Sources</i-nav-item>
        <i-nav-item to='/blob'>Blob</i-nav-item>
        <i-nav-item to='/embed'>Embed</i-nav-item>
        <i-nav-item to='/help'>Help</i-nav-item>
        <i-nav-item v-if='!user' to='/login'>Login</i-nav-item>
        <i-nav-item v-else @click='logout'>Logout</i-nav-item>
      </i-nav>
    </i-navbar-collapsible>
  </i-navbar>
</template>