<script lang="ts" setup>
import './assets/tailwind.scss'
</script>


<template>
  <div class='container mx-auto w-full'>
    <Navbar></Navbar>
    <section class='max-w-5xl mx-auto'>
      <NuxtPage />
    </section>
  </div>
</template>

<style lang="scss">
@import '@inkline/inkline/css/variables';
@import '@inkline/inkline/css/mixins';

:root {
    --color--primary--h: 195deg;
    --color--primary--s: 77%;
    --color--primary--l: 39%;
}
</style>
