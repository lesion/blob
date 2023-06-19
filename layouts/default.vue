<script setup>
const { initAuth, isLogged, authUser, logout } = useAuth()
const showSidebar = ref(false)
const showLanguageSidebar = ref(false)
const { Settings } = useSettings()
// const i18n = useI18n()


const menuItems = [
  { title: 'Blobs', path: '/blobs', icon: 'mdi-book-multiple-outline' },
  { title: 'Tags', path: '/tags', icon: 'mdi-tag-multiple-outline' },
  { title: 'Share', path: '/share', icon: 'mdi-widgets-outline' },
  // { title: '', path: '/about', icon: 'mdi-help-circle-outline' },
  // { title: '', path: '/about', icon: 'mdi-translate' },
  // { title: 'Sign In', path: '/signin', icon: 'mdi-lock-open-outline', auth: false },
  // { title: 'Admin', path: '/admin', icon: 'mdi-cog-outline', auth: true },
]

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
          v-for="item in menuItems"
          :key="$t(item.title)"
          :to="item.path">
            <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  
    
  <v-navigation-drawer location="right" v-model="showLanguageSidebar" temporary>
    <v-card-title>{{$t('Language')}}</v-card-title>
    <v-list nav>
      <v-list-item
        v-for="item in $i18n.locales" :active="$i18n.locale === item.code"
        :key="item.code" @click="$i18n.setLocale(item.code)">
          {{ item.name }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <v-img height="120px" src="/media/logo" />  -->

  <v-app-bar app  scroll-behaviour="hide" class="text-red ">
    <v-app-bar-nav-icon class="d-flex d-sm-none" @click="showSidebar = !showSidebar" />
    <v-toolbar-title>
        <nuxt-link class='text-decoration-none text-red' to='/'>
          <v-img src='/media/logo' height=60 :alt='Settings.name' class="float-left"/>
        </nuxt-link>
    </v-toolbar-title>
    <v-btn class="d-none d-sm-flex"
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path">
      <v-icon>{{ item.icon }}</v-icon>
      {{ $t(item.title) }}
    </v-btn>
    <v-btn @click="showLanguageSidebar = !showLanguageSidebar" icon='mdi-translate' />
    <v-btn to="/about" icon="mdi-help-circle-outline" />
    <client-only v-if="isLogged">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }"><v-btn v-bind="props" icon='mdi-menu' /></template>
        <v-card width="250">
          <v-card-text>
            <v-btn to='/admin' block class="mb-3 text-red">{{ $t('Admin') }}</v-btn>
            <v-btn block color="red" @click="logout">{{ $t('Signout') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
      <template #placeholder><v-btn icon='mdi-menu' /></template>
    </client-only>
    <v-btn v-else to="/signin"><v-icon>mdi-lock-open-outline</v-icon></v-btn>
</v-app-bar>

<v-main style="padding-top: 68px;">
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