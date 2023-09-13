<script setup>
import { useI18n } from 'vue-i18n'
const { $confirm, $notify } = useNuxtApp()
const { isLogged } = useAuth()

const { post, preview } = defineProps({ post: Object, preview: Boolean })
const i18n = useI18n()

const date = computed( () => new Date(post?.date).toLocaleDateString(i18n.locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" }))

async function toggleVisibility () {
  const { error } = await useFetch(`/api/post/detail/${post.id}`, { method: 'PATCH', body: { visible: !post.visible} })
  if (error.value) {
    $notify("Error! " + error.value.statusError)
    return
  }
  emit('toggleVisibility')
}

const image = computed(() => post.image ? `/media/${post.image}` : '/media/fallbackImage.png')
const imageWebP = computed(() => post.image ? `/media/${post.image.replace(/.jpg$/, '.webp')}` : '/media/fallbackImage.png')

const emit = defineEmits(['remove', 'toggleVisibility'])

async function remove () {
  const ret = await $confirm(`Are you sure yo want to remove post <u>${post.title}</u>?`)
  if (!ret) return
  const { error } = await useFetch(`/api/post/${post.id}`, { method: 'DELETE', })
  if (error.value) {
    $notify("Error removing post: " + error.value.statusError)
    return
  }
  $notify('Removed', 'success')
  emit('remove')
}

</script>
<template>
  <article class="post" :class="{ hidden: post?.visible === false }">
    <!-- images has a webp version with a jpg fallback and an error fallback image -->
    <nuxt-link :to="post.URL" class="media" target="_blank">
      <v-img :src="image" min-height="250">
        <template v-slot:sources>
          <source :srcset="imageWebP" />
        </template>
        <template v-slot:error>
          <v-img src="/media/fallbackImage.png" />
        </template>
      </v-img>
    </nuxt-link>

    <section class="content">
        <div>
        <span class="d-flex">
          <span class='font-weight-light' v-if="post.source">{{ date }} / <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link></span>
          <span class='font-weight-light' v-else>{{ date }}</span>
        </span>
        <div  v-if="post?.tags?.length" class="mb-1">
          <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant="outlined" size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
        </div>
        <nuxt-link :href='post.URL' target="_blank" class='font-weight-bold text-h5 mb-6 title'>{{post.title}}</nuxt-link>
        <div class='summary text-caption text-medium-emphasis' v-text='post.summary' />
      </div>
      <div class="d-flex" v-if="!preview">
        <v-btn icon="mdi-text" variant="text" alt="delete" size="small" :to="`/p/${post.id}`"></v-btn>
 
        <v-btn v-if='isLogged'
          icon="mdi-delete"
          color='red'
          variant="text"
          size="small"
          @click="remove" />

        <v-btn v-if='isLogged'
          :icon="post?.visible ? 'mdi-eye-off' : 'mdi-eye'"
          color='orange'
          variant="text"
          size="small"
          @click="toggleVisibility"></v-btn>
      </div>
    </section>
  </article>
</template>
<style>

.post{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    /* max-height: 100px; */
    /* min-height: 200px; */

    width: 100%;
    column-gap: 35px;
    margin-top: 8px;
    margin-bottom: 40px;
}

.post .media {
    width: 350px;
    overflow: hidden;
    flex: 1 1 350px;
    background: none;
  }
  
  .media picture,
  .media img {
    aspect-ratio: 1.7778;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 1px solid #eee;
}

.hidden {
  opacity: 0.4;
}

.post .content {
  flex: 1 1 600px;
  align-self: stretch;
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