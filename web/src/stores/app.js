import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('app', () => {
  // App loading
  const loading = ref(true)

  function toggleLoading(state) {
    loading.value = state
  }

  return { loading, toggleLoading }
})
