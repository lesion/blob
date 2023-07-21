<script setup>
import { useI18n } from 'vue-i18n'

const { isLogged } = useAuth()

let { post } = defineProps({ post: Object })
const i18n = useI18n()

const date = computed( () => new Date(post?.date).toLocaleDateString(i18n.locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" }))

async function toggleVisibility () {
  console.error(post.visible, post.title)
  const { data, error } = await useLazyFetch(`/api/post/detail/${post.id}`, { method: 'PATCH', body: { visible: !post.visible} })
  post.visible = !post.visible
  console.error(data, error)
}

</script>
<template>
  <div class="post" :class="{ hidden: post.visible }">

    <!-- post's image on the left, TODO: we should use nuxt-image here! -->
    <nuxt-link :to="post.URL" class="img rounded" target="_blank">
      <v-img class='img rounded'
        cover
        aspect-ratio='1.7778'
        :alt='post.title'
        :src='post.image ? `/media/${post.image}` : "/media/fallbackImage.png"'
        />
    </nuxt-link>

    <!--  -->
    <div class='content'>
      <div>
        <span class="d-flex">
          <span class='font-weight-light' v-if="post.source">{{ date }} / <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link></span>
          <span class='font-weight-light' v-else>{{ date }}</span>
        </span>
        <div  v-if="post?.tags?.length" class="mb-1">
          <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant='outlined' size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
        </div>
        <nuxt-link :href='post.URL' target="_blank" class='font-weight-bold text-h5 mb-6 title'>{{post.title}}</nuxt-link>
        <div class='summary text-caption text-medium-emphasis' v-text='post.summary' />
      </div>
      <div class="d-flex">
        <v-btn icon="mdi-text" variant="text" alt="delete" size="small" :to="`/p/${post.id}`"></v-btn>
        <v-btn icon="mdi-share" variant="text" alt="delete" size="small" @click="$emitt('share', post)"></v-btn>
        <v-btn v-if='isLogged'
          :icon="post.visible ? 'mdi-eye-off' : 'mdi-eye'"
          color='orange'
          variant="text"
          size="small"
          @click="toggleVisibility"></v-btn>
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

.hidden {
  opacity: 0.4;
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
}

.content .title {
  background: linear-gradient(0deg, slateblue, slateblue) no-repeat right bottom / 0 var(--bg-h);
  transition: background-size 550ms;
  --bg-h: 100%;
  padding-bottom: 2px;
  --bg-h: 2px;
  text-decoration: none;
  line-height: 1;
}

.content .title:where(:hover, :focus-visible) {
  background-size: 100% var(--bg-h);
  background-position-x: left;
}

</style>



