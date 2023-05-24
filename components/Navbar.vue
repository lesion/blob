<script setup>
const { isLogged } = useAuth()
</script>
<template>
  <v-toolbar  color='lime-lighten-2'>
    <v-toolbar-title><nuxt-link to='/'>Blob</nuxt-link></v-toolbar-title>
    <v-spacer></v-spacer>

    <nuxt-link to='/blobs'>
      <v-tooltip text="Blobs" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-book-multiple-outline</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>

    <nuxt-link to='/tag'>
      <v-tooltip text="Tags" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-tag-multiple-outline</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>

    <nuxt-link to='/about'>
      <v-tooltip text="About" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-help-circle-outline</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>

    <nuxt-link to='/embed'>
      <v-tooltip text="Share" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-widgets-outline</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>

    <nuxt-link to='/login' v-if="!isLogged">
      <v-tooltip text="Login" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-login</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>
    <nuxt-link to='/admin' v-else>
      <v-tooltip text="Admin" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="deep-purple"><v-icon>mdi-cog-outline</v-icon></v-btn>
        </template>
      </v-tooltip>
    </nuxt-link>

  </v-toolbar>
</template>