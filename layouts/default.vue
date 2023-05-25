<script setup>
const { initAuth, isLogged, authUser } = useAuth()
const showSidebar = ref(false)

const menuItems = [
  { title: 'Home', path: '/', icon: 'mdi-home-outline' },
  { title: 'Blobs', path: '/blobs', icon: 'mdi-book-multiple-outline' },
  { title: 'Tags', path: '/tags', icon: 'mdi-tag-multiple-outline' },
  { title: 'Share', path: '/share', icon: 'mdi-widgets-outline' },
  { title: 'About', path: '/about', icon: 'mdi-help-circle-outline' },
  { title: 'Sign In', path: '/signin', icon: 'mdi-lock-open-outline', auth: false },
  { title: 'Admin', path: '/admin', icon: 'mdi-cog-outline', auth: true },
]

const filteredMenuItems = computed( () => menuItems.filter(m => typeof m?.auth !== 'undefined' ? m.auth === isLogged.value : true ))


onBeforeMount(initAuth)

</script>

<template>
  <v-app>
    
    <client-only>
      <Dialog />
      <Notification />
    </client-only>
    
    <v-navigation-drawer v-model="showSidebar" temporary>
      <v-list nav>
        <v-list-item
        v-for="item in filteredMenuItems"
        :key="item.title"
        :to="item.path">
          <v-icon>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  
  <v-toolbar app>
    <v-app-bar-nav-icon class="d-flex d-md-none" @click="showSidebar = !showSidebar" />
    <v-toolbar-title>
        Blob
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn
      color="primary"
      v-for="item in filteredMenuItems"
      :key="item.path"
        :to="item.path">
      <v-icon left dark>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
  </v-toolbar-items>
</v-toolbar>


<v-main>
  <a name='content' id='content'></a>
  <v-container>
    <NuxtPage />
  </v-container>
</v-main>
</v-app>
</template>

<style>
.page-enter-active,.page-leave-active {  transition: all 0.4s;}.page-enter-from,.page-leave-to {  opacity: 0;  filter: blur(1rem);}

/* a,
a:visited {
  color: #3f51b5;
  text-decoration: none;
}

a:focus,
a:hover {
  color: #8fa4ea;
} */

/* .v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  font-size: 1em;
} */
</style>