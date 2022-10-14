<script setup>
defineProps({ post: Object })
</script>
<template>
  <article class='post mb-8 flex'>
    <div class='py-0 pa-md-2 img'>
      <a :href='post.URL' target='_blank'><img :src="post.image" alt="" /></a>
    </div>
    <div class='py-0 pl-md-5 sm:pl-7'>
      <p class='font-weight-bold'>
        <nuxt-link :to="`/s/${post.source.id}`" class="text-red-600 font-bold hover:underline">
          {{post.source && post.source.name}}</nuxt-link> - {{new Date(post.date).toLocaleString('it-IT', { weekday:
          'long', month: 'long', day: 'numeric'})}}
      </p>
      <a class="text-3xl pa-1 text-red-500 font-extrabold hover:underline" :href='post.URL'
        target='_blank'>{{post.title}}</a>
      <p class='mt-5 flex flex-wrap'>
        <nuxt-link v-for='tag in post.tags' :key='tag.id'
          class='mr-1 p-1 mt-1 px-2 font-bold hover:underline rounded text-white bg-red-500' :to='`/tag/${tag.id}`'>
          {{tag.name}}</nuxt-link>
      </p>
    </div>
  </article>
</template>
<style scoped>
.post .img {
  width: 100%;
  max-width: 450px;
  max-height: 250px;
  flex: 1 0 auto;
  aspect-ratio: 1.7778;
  display: flex;
}

.img img {
  @apply object-cover h-full w-full;

}

.post .source {
  @apply block text-base font-bold;
}
</style>



