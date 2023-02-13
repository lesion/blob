<script setup>

defineProps({ post: Object })

</script>
<template>
  <div class='d-flex mt-5 mb-2 flex-wrap'>

    <v-img class='img rounded'
      cover
      aspect-ratio='1.7778'
      :alt='post.title'
      :src='post.image ? `/api/media/${post.image}` : "/noimg.svg"'
      loading="lazy"/>
    <div class='content ml-md-5'>
      <div class='font-weight-light'>from <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link> at {{new Date(post.date).toDateString()}}</div>
      <nuxt-link :href='post.URL' class='font-weight-bold text-h5' color='indigo'>{{post.title}}</nuxt-link>
      <v-list-item-subtitle>
        <div v-html='post.summary' />
        <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant='outlined' color='indigo' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
      </v-list-item-subtitle>
    </div>

  </div>

</template>
<style scoped>

.content {
  flex: 1 1 500px;
}

.img {
    box-shadow: 0px 0px 2px black;
    width: 100%;
    aspect-ratio: 1.7778;
    flex: 1 1 400px;
}
/* 
img {
    object-fit: cover;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  } */



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



