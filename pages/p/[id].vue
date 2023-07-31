<script setup>
const route = useRoute()
const { Settings } = useSettings()

const i18n = useI18n()

const { data: post, pending } = await useFetch(`/api/post/detail/${route.params.id}`, { key: route.params.id })

const date = computed( () => new Date(post?.value.date).toLocaleDateString(i18n.locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" }))

useHead( {
  title: `${Settings?.value.name} - ${post?.value?.title}`
})

const image = computed(() => post?.value.image ? `/media/${post.value.image}` : '/media/fallbackImage.png')
const imageWebP = computed(() => post?.value.image ? `/media/${post.value.image.replace(/.jpg$/, '.webp')}` : '/media/fallbackImage.png')

</script>

<template>
  <v-container v-if='!pending' :loading="pending" class="details">
    <picture class="overflow-hidden">
        <source :srcset="imageWebP" loading="lazy"/>
        <img class='w-100' :src="image" loading="lazy"/>
      </picture>
      <h1>{{ post?.title }}</h1>
      <nuxt-link :to='`/s/${post.source.id}`'>{{post.source.name || post.source.link}}</nuxt-link> - 
      {{ date }}
      <div  v-if="post?.tags?.length" class="mb-1">
          <v-chip label :to='`/tag/${tag.id}`' v-for='tag in post.tags' :key='tag.id' variant="tonal" size='small' class='mr-1 mt-1'>{{tag.name}}</v-chip>
      </div>

      <div v-html="post?.content" class="content ma-6 text-h5"></div>
    </v-container>
</template>

<style>
.details img {
  max-height: 300px;
  object-fit: cover;
  width: 100%;
}

.details .content  img {
  max-width: 100%;
}

</style>