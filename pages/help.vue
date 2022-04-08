<template>
  <section>
    <h2>Help</h2>
    <h3>Dove prendiamo i contenuti?</h3>
    <p>Prendiamo i contenuti dalle fonti inserite usando i feed rss come metodo per ricevere gli aggiornamenti.</p>
    <h3>Come aggiungo una fonte?</h3>
    <p>Per aggiungere una fonte basta inserire l'indirizzo web o ancora meglio il link diretto ad un feed rss / atom nella pagina <nuxt-link to='/source'>Fonti</nuxt-link>.</p>
    <h3>Come incorporo una fonte dentro un sito?</h3>
    <p>Andando su <nuxt-link to='/widget'>Widget</nuxt-link> troverai le varie modalità per incorporare contenuti sul tuo sito.</p>
    <h3>I contenuti della fonte che ho aggiunto non hanno l'immagine d'anteprima</h3>
  </section>
</template>
<style scoped>
h3 {
  @apply font-bold block font-sans mt-4 text-xl;
}
</style>