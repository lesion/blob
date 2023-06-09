<script setup>
import { useI18n } from 'vue-i18n';


const { post } = defineProps({ post: Object })
const i18n = useI18n()

const date = computed( () => new Date(post?.date).toLocaleDateString(i18n.locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" }))

</script>
<template>
  <div class="post">

    <nuxt-link :to="post.URL" class="img rounded">
      <v-img class='img rounded'
        cover
        aspect-ratio='1.7778'
        :alt='post.title'
        :src='post.image ? `/media/${post.image}` : "/media/fallbackImage.png"'
        />
    </nuxt-link>

    <div class='content'>
      <div>
        <div class='font-weight-light' v-if="post.source">{{ date }} / <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link></div>
        <div class='font-weight-light' v-else>{{ date }}</div>
        <div class="py-2" v-if="post?.tags?.length">
          <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant='outlined' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
        </div>
        <nuxt-link :href='post.URL' target="_blank" class='font-weight-bold text-h5 mb-6'>{{post.title}}</nuxt-link>
        <div class='summary text-caption text-medium-emphasis' v-text='post.summary' />
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
    column-gap: 35px;
    margin-top: 8px;
    margin-bottom: 40px;
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

.content a {
  color: rgba(var(--v-theme-primary));
  background: linear-gradient(0deg, slateblue, slateblue) no-repeat right bottom / 0 var(--bg-h);
  transition: background-size 550ms;
  --bg-h: 100%;
  padding-bottom: 2px;
  --bg-h: 2px;
  text-decoration: none;
  line-height: 1;
}

.content a:where(:hover, :focus-visible) {
  background-size: 100% var(--bg-h);
  background-position-x: left;
}

</style>



