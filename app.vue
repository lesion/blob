<script setup>
// import './assets/tailwind.scss';
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()

onBeforeMount(initAuth)

</script>

<template>
  <v-app>

    <Navbar />
      <client-only>
        <Dialog />
        <Notification />
      </client-only>
    <v-main>
      <a name='content' id='content'></a>
      <v-container>
        <div>
          <NuxtPage />
        </div>
      </v-container>
    </v-main>

  </v-app>
</template>

<style>
.v-container {
  max-width: 1000px;
}

a,
a:visited {
  color: #3f51b5;
  text-decoration: none;
}

a:focus,
a:hover {
  color: #8fa4ea;
}

.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  font-size: 1em;
}
</style>