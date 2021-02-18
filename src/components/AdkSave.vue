<template>
  <v-container>
    <v-btn
      x-large
      outlined
      :disabled="invalid"
      depressed
      class="mt-5"
    >Save</v-btn>
    <v-alert
      v-if="status.length"
      class="mt-3"
      :type="status.includes('Saved') ? 'success' : 'error'"
    >{{ status }}</v-alert>
  </v-container>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import { MongoDoc } from '../types'

  export default defineComponent({
    name: 'AdkSave',
    props: {
      value: {
        required: true,
        type: Object as () => MongoDoc,
      },
    },
  })
</script>
