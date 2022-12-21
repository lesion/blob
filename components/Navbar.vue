<script setup>
const { useAuthUser, logout } = useAuth()
const user = useAuthUser()

</script>
<template>
  <i-navbar>
    <i-navbar-brand to="/"><img src='/blob.png' class='h-24' /></i-navbar-brand>
    <i-navbar-collapsible class='_justify-content:flex-end text-right flex-end'>
      <i-nav v-if='user' class='gap-2'>
        <i-nav-item to='/source'>Sources</i-nav-item>
        <i-nav-item to='/blob'>Blob</i-nav-item>
        <i-nav-item to='/embed'>Embed</i-nav-item>
        <i-nav-item to='/help'>Help</i-nav-item>
        <i-nav-item to='/' @click.prevent='logout'>Logout</i-nav-item>
      </i-nav>
      <i-nav v-else class='gap-2'>
        <i-nav-item to='/help'>Help</i-nav-item>
        <i-nav-item to='/login'>Login</i-nav-item>
      </i-nav>
    </i-navbar-collapsible>
  </i-navbar>
</template>
