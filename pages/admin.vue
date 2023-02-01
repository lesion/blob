<script setup>

const activeTab = ref('settings')

</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Admin</v-card-title>
      
      <v-tabs v-model='activeTab'>
        <v-tab value='settings'>{{$t('Settings')}}</v-tab>
        <v-tab value='sources'>{{$t('Sources')}}</v-tab>
        <v-tab value='blobs'>{{$t('Blobs')}}</v-tab>
        <v-tab value='logs'>{{$t('Logs')}}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model='activeTab'>
          <v-window-item active value='settings'><AdminSettings></AdminSettings></v-window-item>
          <v-window-item value='logs'><AdminLogs></AdminLogs></v-window-item>
          <v-window-item value='sources'><AdminSources></AdminSources></v-window-item>
          <v-window-item value='blobs'><AdminBlobs></AdminBlobs></v-window-item>

        </v-window>

      </v-card-text>
    </v-card>
  </v-container>
</template>