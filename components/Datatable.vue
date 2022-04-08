<script>
export default {
  name: 'Datatable',
  props: {
    headers: { type: Array, default: () => [] },
    items: { type: Array, default: () => []},
    caption: { type: String, default: '' }

  }
}
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
    <caption v-if='caption'>{{caption}}</caption>
    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr>
        <th v-for='(header, idx) in headers' :key='idx' scope="col" class="px-6 py-3" v-text='header'></th>
      </tr>
    </thead>
    <tbody>
      <tr class="py-3 bg-white border-t" v-for='item in items' :key='item.id'>
        <slot v-for='header in headers' :key='header' :name='header' :item='item'>
          <td class='py-3'>{{item[header]}}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>