<script setup>
const { $confirm, $notify } = useNuxtApp()

const { data: Settings } = await useFetch('/api/setting')

console.error(Settings)

const saveSetting = async (key) => {
  await $fetch(`/api/setting`, { method: 'POST', body: { key, value: Settings.value[key] } })
  // Settings.value[key] = value
}


// const { Settings, saveSetting } = useSettings()

// await getSettings()
async function resetLogo () {
  console.error('dentro reset logo')
}

async function uploadLogo (value) {
  if (!value.length) return
  const formData = new FormData()
  formData.append('logo', value[0])
  await $fetch('/api/setting/logo', { method: 'POST', body: formData })
}

</script>

<template>
  <v-container>
      <v-card-title>{{$t('Blob')}}</v-card-title>
      <span class="text-grey-200">{{$t('blob.create_description')}}</span>
      <main class='mt-1 mb-6'>

        <v-form>
          <!-- logo -->
          <v-row>
            <v-col cols='8'>
              <v-file-input accept='image/*' label="Logo" variant='outlined' clearable @click:clear='resetLogo'
                persistent-hint hint='' @update:modelValue='uploadLogo'></v-file-input>
            </v-col>
            <v-col>
              <v-img height='60' :src='`/blob.png`'></v-img>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field v-model.number='Settings.refresh_loop_minutes'
                type='number' variant='outlined' persistent-hint label='N. seconds' hint='N. minutes to wait before refresh sources'
                @blur="saveSetting('refresh_loop_seconds')"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field type='number' variant='outlined' persistent-hint label='N. max posts' v-model.number='Settings.max_post_per_source'
                @blur="saveSetting('max_post_per_source')" hint='How many posts you want to select from each source at homepage?'></v-text-field>
            </v-col>
          </v-row>


          <!-- about ? -->
          <v-row>
            <v-col>
              <v-textarea variant='outlined' label='About' hint='A description of your website' v-model.lazy.trim='Settings.about' persistent-hint @blur="saveSetting('about')"></v-textarea>
            </v-col>
          </v-row>

        </v-form>
      </main>
  </v-container>
</template>