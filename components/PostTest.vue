<script setup>

defineProps({ post: Object })

</script>
<template>
  <div class="post">

    <v-img class='img rounded'
      cover
      aspect-ratio='1.7778'
      :alt='post.title'
      :src='post.image ? `/api/media/${post.image}` : "/api/media/fallbackImage.png"'
      loading="lazy"/>

    <div class='content'>
      <div>
        <div v-if='post.source' class='font-weight-light'>from <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link> at {{new Date(post.date).toDateString()}}</div>
        <div v-else class='font-weight-light'>{{new Date(post.date).toDateString()}}</div>
        <nuxt-link :href='post.URL' class='font-weight-bold text-h5 mb-6' color='indigo'>{{post.title}}</nuxt-link>
        <div class='summary text-caption text-medium-emphasis' v-text='post.summary' />
      </div>
      <div>
        <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant='outlined' color='indigo' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
      </div>
    </div>

  </div>

</template>
<style scoped>

.post{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    gap: 15px;
    margin-top: 20px;
}

.content {
  flex: 1 1 500px;
  align-self: stretch;
  max-height: 300px;
  flex-basis: 500px;
  flex-grow: 1;
  word-break: break-word;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.content .summary {
  max-height: 140px;
  overflow: hidden;
}

.img {
    box-shadow: 0px 0px 2px black;
    width: 100%;
    aspect-ratio: 1.7778;
    /* flex-basis: 300px; */
    flex: 1 1 300px;
}

a {
  color: rgba(var(--v-theme-primary));
  background: linear-gradient(0deg, slateblue, slateblue) no-repeat right bottom / 0 var(--bg-h);
  transition: background-size 550ms;
  --bg-h: 100%;
  padding-bottom: 2px;
  --bg-h: 2px;
  text-decoration: none;
  line-height: 1;
}

a:where(:hover, :focus-visible) {
  background-size: 100% var(--bg-h);
  background-position-x: left;
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



