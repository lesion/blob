<script setup>
import { when } from '../webcomponents/src/helpers.js'

defineProps({ post: Object })

</script>
<template>
  <v-list-item class='mt-2'>

    <div class="img">
      <img
        style="aspect-ratio=1.7778;"
        :alt='post.title'
        :src='post.image ? post.image : "/noimg.svg"'
        loading="lazy"/>
    </div>    
    <div class='text-caption font-weight-light'>from <nuxt-link :to='`/s/${post.source.id}`' v-html='post.source.name || post.source.link' /> at {{new Date(post.date).toDateString()}}</div>
    <nuxt-link :href='post.URL' class='font-weight-bold black' color='indigo' v-html='post.title' />
    <v-list-item-subtitle>
      <div v-html='post.summary' />

      <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant='outlined' color='indigo' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
    </v-list-item-subtitle>

  </v-list-item>

</template>
<style scoped>

.img {
    width: 350px;
    max-height: 250px;
    aspect-ratio: 1.7778;
    float: left;
    margin-right: 15px;
}

img {
    object-fit: cover;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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



