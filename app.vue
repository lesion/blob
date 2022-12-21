<script setup>
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()

onBeforeMount(initAuth)

</script>

<template>
  <div class='container max-w-6xl mx-auto m-2'>

    <Navbar />
    <Dialog />

    <section class='mx-auto mt-4' name='content' id='content'>
      <a name='content' id='content'></a>
      <NuxtPage />
    </section>

  </div>
</template>

<style lang="scss">
@import './assets/tailwind.scss';
@import '@inkline/inkline/css/variables';
@import '@inkline/inkline/css/mixins';

@include i-navbar() {
  background: transparent;
  border: none;
  box-shadow: none;
}

@include i-modal() {
  ----header-background: color('red');
}
</style>
