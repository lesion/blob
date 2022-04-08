<script setup>
import { ref, computed, reactive } from 'vue'

  let selectedSource = ref({})
  let selectedTag = ref({})
  let cohort = reactive({})
  // let cohorts = ref([])
  let loading = true
  let source = ref(null)
  let cohortSources = ref([])
  let sources = []
  let headers = ['Nome', 'Descrizione', 'Visto', 'Azioni']

  const { data: cohorts, refresh: refreshCohort } = useLazyAsyncData('cohorts', () => $fetch('/api/cohort'))
  console.error(cohorts)

  // const ret = await useFetch('/api/cohort')
  // cohorts = ret.data

  const addFilterDescription = computed(() => {
    if (!selectedSource.value.name) {
      return 'Seleziona una fonte'
    }
    if (!selectedTag.value.name) {
      return `Aggiungi tutti gli articoli da ${selectedSource.value.name}`
    } else {
      return `Aggiungi tutti gli articoli taggati ${selectedTag.value.name} da ${selectedSource.value.name}`
    }
  })

  async function addFilter () {
    console.error(cohort)
    const cohortId = cohort.id
    const sourceId = selectedSource.value.id
    const tagId = selectedTag.value.id
    try {
      await $fetch(`/api/cohort/filter`, { method: 'POST', body: { cohortId, sourceId, tagId }})
      await refreshCohort()
      useCohort(cohort)
    } catch (e) { }
  }

  function searchSource (search) {
    return $fetch(`/api/source/search?search=${encodeURIComponent(search)}`)
  }

  async function searchTag (search) {
    return $fetch(`/api/tag/search?search=${encodeURIComponent(search)}`)
  }

  async function addCohort () {
    try {
      const ret = await $fetch(`/api/cohort/add`, { method: 'POST', body: { name: cohort.name, description: cohort.description } })
      await refreshCohort()
      useCohort(ret)
    } catch (e) {
      console.error(e)
    }
  }

  async function delCohort(cohort) {
    try {
      const ret = await $fetch(`/api/cohort/del?id=${cohort.id}`)
      refreshCohort()
      console.error(ret)
    } catch (e) {
      console.error(e)
    }
  }

  async function delFilter(filter) {
    try {
      const ret = await $fetch(`/api/filter/del?id=${filter.id}`)
      refreshCohort()
      useCohort(cohort)
      console.error(ret)
    } catch (e) {
      console.error(e)
    }
  }


  async function addSource () {
    cohortSources.unshift(source)
    source = null
    sources = []
  }

  function useCohort (c) {
    console.error(c)
    cohort.id = c.id
    cohort.name = c.name
    cohort.description = c.description
    cohortSources.value = c.Filter?.map(f => ({
      id: f.id,
      sourceId: f.sourceId,
      name: f.source.name,
      link: f.source.link,
      description: f.source.description,
      tag: f.tag?.name
    }))
  }

  function copy (ev, item) {
    const str = `<display-feed feed='/api/cohort/${item.id}'></display-feed>`
    try {
      navigator.clipboard.writeText(str)
    } catch (e) {
      const el = document.createElement('textarea')
      el.addEventListener('focusin', e => e.stopPropagation())
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }
</script>
<template>
<section class='mt-4'>
  <div class="rounded overflow-hidden shadow-lg p-4">
    <h2>Aggiungi il tuo blob</h2>
    <h6 class="text-grey-200">un blob è un raggruppamento di contenuti presi da fonti scelte, eventualmente filtrate per tag</h6>
    <main class='mt-1 mb-6'>

      <input type='text' label='Name' v-model='cohort.name' placeholder='Come lo chiamiamo?'/>
      <input type='text' label='Description' v-model='cohort.description' placeholder='Che roba è?'/>

      <button class="disabled:text-opacity-20" @click='addCohort' :disabled='!cohort.name'>Crea blob</button>

      <section v-if='!!cohort.name'>
        <Autocomplete :search='searchSource' v-model='selectedSource ' placeholder='Cerca una fonte'>
          <template v-slot:item="{ item }">
            <p>{{ item.name }}</p>
            <small>{{ item.description }}</small>
          </template>
        </Autocomplete>

        <Autocomplete :search='searchTag' v-model='selectedTag' placeholder='Prendo tutto o filtro?'/>

        <button @click='addFilter' :disabled="!selectedSource?.name" v-html='addFilterDescription'></button>


        <Datatable :items='cohortSources' :headers='["name", "description", "tag", "azioni"]'>
          <template v-slot:name='{ item }'>
            <th><nuxt-link :to='`/s/${item.sourceId}`' v-text='item.name'/></th>
          </template>
          <template v-slot:tag='{ item }'>
            <td>{{item.tag || 'Tutti'}}</td>
          </template>
          <template v-slot:azioni='{ item }'>
            <td><button @click='delFilter(item)'>Elimina</button></td>
          </template>
        </Datatable>
      </section>

    </main>

    <h2>Lista di blob</h2>
    <main class='mt-2'>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3">Descrizione</th>
            <th scope="col" class="px-6 py-3">Filtri</th>
            <th scope="col" class="px-6 py-3 float-right">Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-t" v-for='c in cohorts' :key='c.id'>
            <th scope="row" v-text='c.name'></th>
            <td class="px-6 py-4" v-text='c.description'></td>
            <td><div v-for='filter in c.Filter' :key='filter.id'>{{filter.source.name}} ({{filter.tag?.name || 'tutto'}})</div></td>
            <td class="px-6 py-4 text-right">
              <button class='mr-1' @click='useCohort(c)'>Usa</button>
              <button class="text-red-300 border-red-300 mr-1" @click='delCohort(c)'>Del</button>              
              <nuxt-link :to='`/g/${c.id}`'><button>Vedi</button></nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

  </div>
</section>
</template>