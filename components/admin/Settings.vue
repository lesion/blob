<script setup>
const { $confirm, $notify } = useNuxtApp()

const { Settings, saveSetting } = useSettings()

// await getSettings()
async function resetLogo () {
  console.error('dentro reset logo')
}

async function resetImage () {
  console.error('dentro reset image')
}

async function uploadLogo (value) {
  if (!value.length) return
  const formData = new FormData()
  formData.append('logo', value[0])
  await $fetch('/api/setting/logo', { method: 'POST', body: formData })
}

async function uploadFallbackImage(value) {
  if (!value.length) return
  const formData = new FormData()
  formData.append('fallbackImage', value[0])
  await $fetch('/api/setting/fallbackImage', { method: 'POST', body: formData })  
}

</script>

<template>
  <v-container>
      <main class='mt-1 mb-6'>
        <v-form>
          <!-- logo -->
          <v-row>
            <v-col cols='8'>
              <v-text-field label="Name" variant='outlined' @update:modelValue='ev => saveSetting("name", ev)' :modelValue="Settings.name"></v-text-field>
            </v-col>

            <v-col cols='8'>
              <v-file-input accept='image/*' label="Logo" variant='outlined' clearable @click:clear='resetLogo'
                persistent-hint hint='A full page refresh is needed (ctrl+shift+r)' @update:modelValue='uploadLogo'></v-file-input>
            </v-col>
            <v-col>
              <v-img height='60' src='/media/logo'></v-img>
            </v-col>
          </v-row>

          <!-- fallback image -->
          <v-row>
            <v-col cols='8'>
              <v-file-input accept='image/*' label="Fallback Image" variant='outlined' clearable @click:clear='resetImage'
                persistent-hint hint='A full page refresh is needed (ctrl+shift+r)' @update:modelValue='uploadFallbackImage'></v-file-input>
            </v-col>
            <v-col>
              <v-img height='60' :src='`/media/fallback`'></v-img>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols='12'>
              <v-switch inset hide-details color='primary' :modelValue="Settings.enableSearch" label='Enable search' @update:modelValue='ev => saveSetting("enableSearch", ev)'/>
              <v-switch v-if='Settings.enableSearch' inset hide-details color='primary' :modelValue="Settings.allowAddURL" label='Allow to add custom URL' @update:modelValue='ev => saveSetting("allowAddURL", ev)'/>
              <v-switch inset hide-details color='primary' :modelValue="Settings.showSourcesInAbout" label='Show sources in about page' @update:modelValue='ev => saveSetting("showSourcesInAbout", ev)'/>
            </v-col>
          </v-row>
          <!-- <v-row> -->
          <!--   <v-col> -->
          <!--     <v-text-field v-model.number='Settings.refresh_loop_minutes' -->
          <!--       type='number' variant='outlined' persistent-hint label='N. minutes' hint='N. minutes to wait before refresh sources (TODO)' -->
          <!--       @blur="saveSetting('refresh_loop_minutes')"></v-text-field> -->
          <!--   </v-col> -->
          <!--   <v-col> -->
          <!--     <v-text-field type='number' variant='outlined' persistent-hint label='N. max posts' v-model.number='Settings.max_post_per_source' -->
          <!--       @blur="saveSetting('max_post_per_source')" hint='How many posts you want to select from each source at homepage? (TODO)'></v-text-field> -->
          <!--   </v-col> -->
          <!-- </v-row> -->

          <!-- about ? -->
          <v-row>
            <v-col>
              <v-textarea variant='outlined' label='About' hint='A description of your website' v-model.lazy.trim='Settings.about' persistent-hint @update:modelValue="ev => saveSetting('about', ev)"></v-textarea>
            </v-col>
          </v-row>

        </v-form>
      </main>
  </v-container>
</template>
