<script setup>
import AppLoading from '@/components/AppLoading.vue'

import { watch, onMounted } from 'vue'
import { appStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useCurrentUser } from 'vuefire'
import { useRoute, useRouter } from 'vue-router'

const store = appStore()
const { loading } = storeToRefs(store)

const route = useRoute()
const router = useRouter()
const user = useCurrentUser()

// we don't need this watcher on server
onMounted(() => {
  watch(user, (user, prevUser) => {
    store.toggleLoading(true)
    if (prevUser && !user) {
      // user logged out
      router.push('/signin')
    } else if (user) {
      // user logged in
      router.push('/')
    } else {
      // fallback
      router.push('/signin')
    }

    store.toggleLoading(false)
  })
})
</script>

<template>
  <v-app>
    <AppLoading v-if="loading" />
    <RouterView v-else />
  </v-app>
</template>
