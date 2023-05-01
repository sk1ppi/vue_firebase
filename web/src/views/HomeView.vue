<script setup>
import { getCurrentUser } from 'vuefire'
import { signOut, getAuth } from 'firebase/auth'
const auth = getAuth()
const signout = () => signOut(auth)
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar>
            <v-spacer></v-spacer>
            <template v-if="$vuetify.display.smAndUp">
              <v-divider
                class="mx-3 align-self-center"
                length="24"
                thickness="2"
                vertical
              ></v-divider>

              <v-btn
                @click="signout"
                icon="mdi-logout-variant"
              ></v-btn>
            </template>
          </v-toolbar>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
