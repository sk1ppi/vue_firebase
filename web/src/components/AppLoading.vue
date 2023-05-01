<script setup>
import { storeToRefs } from 'pinia'
import { appStore } from '@/stores/app'

const store = appStore()
const { loading } = storeToRefs(store)
</script>

<template>
  <v-dialog
    v-model="loading"
    width="auto"
    :scrim="false"
    persistent
    fullscreen
  >
    <v-card>
      <v-card-text>
        <v-progress-circular indeterminate></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
