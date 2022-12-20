<script setup>
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const user = useAuthUser()

onBeforeMount(initAuth)

</script>

<template>
  <div class='container max-w-6xl mx-auto mt-2'>

    <Navbar />
    <Dialog />

    <section class='mx-auto' name='content' id='content'>
      <a name='content' id='content'></a>
      <NuxtPage />
    </section>

  </div>
</template>

<style lang="scss">
@import './assets/tailwind.scss';
@import '@inkline/inkline/css/variables';
@import '@inkline/inkline/css/mixins';


</style>
