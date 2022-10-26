<template>
<section>
  <v-card>
    <v-card-title>Embed to your website</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model='source'
        :search-input.sync="search"
        label='Source'
        hide-no-data
        item-value="id"
        item-text="name"
        :items="sources"
        :disabled='loading'
        :loading='loading'
        prepend-icon="mdi-magnify"
        placeholder="Start typing to search for a source to add"
        clearable
        return-object
        no-filter>
        <template v-slot:item="{ item }">
          <v-list-item-content three-line>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>Last update: {{ item.updatedAt }} / Link: {{item.link}}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>      
      <v-alert class='white--text blue-grey darken-2' v-text='code'></v-alert>
      <display-feed summary='false' :feed="feed"></display-feed>
    </v-card-text>
  </v-card>
</section>
</template>
<script>
export default {
  data: () => ({
    source: {},
    loading: false,
    search: '',
    sources: [],
    blobs: []
  }),
  watch: {
    async search (value) {
      if (!value) return
      this.makeSearch()
    }
  },
  computed: {
    code () {
      return `<script src='/display-feed.js'><\/script><display-feed summary='false' feed="/api/source/${this.source && this.source.id}"></display-feed>`
    },
    feed () {
      if (this.source && this.source.id) {
        return `/api/source/${this.source.id}`
      } else {
        return ''
      }
    }
  },
  methods: {
    async makeSearch () {
      this.loading = true
      this.sources = await this.$http.$get(`/api/source/search?search=${encodeURIComponent(this.search)}`)
      this.loading = false
    },
  }
}
</script>