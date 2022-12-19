<script setup>
import { when } from '../webcomponents/src/helpers.js'

defineProps({ post: Object })

</script>
<template>
    <!-- article -->
    <article class='flex lg:flex-nowrap flex-wrap w-full gap-4'>

      <div class='flex-none'>
        <img class='image rounded border-rounded rounded-r-md' :src="post.image" alt="" />
      </div>

      <div class='content flex-auto'>
        <p class='font-weight-bold'>
          <nuxt-link :to="`/s/${post.source.id}`" class="font-bold hover:underline">
            {{post.source && post.source.name}}</nuxt-link> - {{when(post.date)}}
        </p>
        <a class="text-3xl pa-1 font-extrabold hover:underline" :href='post.URL'
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

.image {
  height: 250px;
  min-width: 400px;
  object-fit: cover;
}

/* .post .content {
  flex-grow: 2;
  min-width: 300px;
}


.post .img {
  max-height: 250px;
  min-width: 300px;
  flex-grow: 1;
  aspect-ratio: 1.7778;
}

.img img {
  @apply object-cover h-full w-full;
  aspect-ratio: 1.7778;
}

.post .source {
  @apply block text-base font-bold;
} */
</style>



