<script setup>
import './assets/tailwind.scss'
</script>

<template>
  <div class='container mx-auto w-full'>

    <Navbar />
    <Dialog />

    <section class='max-w-8xl mx-auto' name='content' id='content'>
      <a name='content' id='content'></a>
      <NuxtPage />
    </section>

  </div>
</template>

<style lang="scss">
@import '@inkline/inkline/css/variables';
@import '@inkline/inkline/css/mixins';

.skip-navigation {
    @extend %visually-hidden;
}

// @include i-button() {
//   ----border-radius: 0px;
// }    

</style>
