<script setup>
  const { pending, data: users, refresh } = useLazyFetch('/api/user')
</script>
<template>
  <v-container v-if="!pending">
    <v-card-title>{{$t('user.name')}}</v-card-title>
    <form @submit.prevent="addUser">
      <v-text-field v-model='url' color='indigo' variant='outlined' label='URL' required :loading='loading' :disabled='loading'>
        <template v-slot:append-inner>
          <v-progress-circular v-if='loading' indeterminate />
          <v-icon v-else>mdi-plus</v-icon>
        </template>
      </v-text-field>
    </form>
    
    <v-card-title>{{$t('Source list')}}</v-card-title>
    <v-data-table
    :headers="headers"
    :items="users" >
      <template v-slot:item.actions="{ item: { raw: user } }">
        <v-btn class='mr-1' variant='text' @click='remove(user)' icon='mdi-delete' color='warning'/>        
      </template>
    </v-data-table>
</v-container>
</template>