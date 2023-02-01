<script setup>
const { $confirm, $notify } = useNuxtApp()
const { Settings, setSetting } = useSettings()

</script>

<template>
  <v-container>
      <v-card-title>{{$t('Blob')}}</v-card-title>
      <span class="text-grey-200">{{$t('blob.create_description')}}</span>

      <p> {{Settings}}</p>
      <main class='mt-1 mb-6'>

        <v-row>
          <v-col cols='8'>
            <v-file-input label="Logo" variant='outlined'></v-file-input>
          </v-col>
          <v-col>
            <v-img height='60' :src='`/blob.png`'></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-textarea variant='outlined' label='About' hint='A description of your website' :value='Settings.about' persistent-hint @update:modelValue="e => setSetting('about', e)"></v-textarea>
        </v-row>
      </main>
  </v-container>
</template>