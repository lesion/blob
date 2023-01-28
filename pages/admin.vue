<script setup>
const { $confirm } = useNuxtApp()

const active = ref('settings')
const about = ref('')

</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Admin</v-card-title>
      
      <v-tabs v-model='active'>
        <v-tab value='settings'>{{$t('Settings')}}</v-tab>
        <v-tab value='sources'>{{$t('Sources')}}</v-tab>
        <v-tab value='blobs'>{{$t('Blobs')}}</v-tab>
        <v-tab value='logs'>{{$t('Logs')}}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model='active'>
          <v-window-item active value='settings'>
            <v-row>
              <v-col cols='8'>
                <v-file-input label="Logo" variant='outlined'></v-file-input>
              </v-col>
              <v-col>
                <v-img height='60' :src='`/blob.png`'></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea variant='outlined' label='About' hint='A description of your website' persistent-hint v-model='about'></v-textarea>
            </v-row>
          </v-window-item>
          <v-window-item value='logs'><AdminLogs></AdminLogs></v-window-item>
          <v-window-item value='sources'><AdminSources></AdminSources></v-window-item>
          <v-window-item value='blobs'><AdminBlobs></AdminBlobs></v-window-item>

        </v-window>

      </v-card-text>
    </v-card>
  </v-container>
</template>