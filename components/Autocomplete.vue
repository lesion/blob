<template>
  <div class="inline">
    <div class="mt-1 inline-flex relative rounded-md">
      <input
        type="text"
        :class="inputClass"
        :placeholder="placeholder"
        aria-label="Search"
        v-model="searchText"
        @input="input"
        @focus='showSearchItems=true'
        @blur='hideMenu'
        @keydown.esc='hideMenu'
        @keydown.up.prevent='up'
        @keydown.down.prevent='down'
        @keydown.enter.prevent='enter'
        ref="searchBox"
      />
      <aside class="absolute z-10 w-full top-10 flex-col items-start bg-white border shadow-md"
          role="menu" aria-labelledby="menu-heading" v-show="lists.length > 0 && showSearchItems == true">
        <ul class="flex flex-col">
          <li
            :class="`p-2 cursor-pointer ${highlightedItem === index && 'bg-red-400'}`"
            v-for="(item, index) in lists"
            :key="index"
            v-on:click="selectSearchItem(item)">
              <slot name='item' v-bind:item="item">{{ item.name }}</slot>
            </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    modelValue: {
      type: Object,
      default: null
    },
    search: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Search here...'
    },
    inputClass: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchText: "",
      selectedItem: {},
      showSearchItems: false,
      highlightedItem: null,
      lists: []
    }
  },
  watch: {
    modelValue () {
      if (this.modelValue.name !== this.selectedItem.name) return
      this.selectSearchItem(this.modelValue)
    }
  },
  methods: {
    async input () {
      console.error('dentro input ', this.modelValue?.name)
      if (this.modelValue?.name) {
        this.$emit('update:modelValue', {})
      }

      if (this.searchText.length < 2) {
        this.lists = []
        this.hideMenu()
        return
      }
      try {
        this.lists = await this.search(this.searchText)
        this.showIfSomething()
      } catch (e) {
        console.error(e)
      }
    },
    selectSearchItem(item) {
      console.error('dentro select search item ', item)
      this.searchText = item.name;
      this.selectedItem = item;
      this.highlightedItem = 0
      this.showSearchItems = false;
      this.$emit('update:modelValue', item)
    },
    hideMenu(){
      if(this.showSearchItems){
        this.showSearchItems = false
        this.highlightedItem = 0
      }
    },
    up () {
      this.showIfSomething()
      if (!this.highlightedItem) return
      this.highlightedItem--
    },
    down () {
      this.showIfSomething()
      console.error(this.lists.length, ' - ', this.highlightedItem)
      if (this.highlightedItem+1 === this.lists.length) return
      this.highlightedItem++
    },
    enter () {
      this.selectSearchItem(this.lists[this.highlightedItem])
    },
    showIfSomething () {
      if (!this.showSearchItems) {
        this.highlightedItem = 0
      }
      this.showSearchItems = this.lists.length > 0
    }
  },

  // created() {
  //   if(this.selectedData){
  //     const selected = this.lists.find(item => item.id == this.selectedData)
  //     this.selectedItem = selected[0]
  //     this.search = selected[0].name
  //   }
  // },

};
</script>

