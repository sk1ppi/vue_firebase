<script setup>
import { ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = getAuth()
const buttonsLoading = ref(false)

async function signinWithGoogle() {
  buttonsLoading.value = true

  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })

  buttonsLoading.value = false
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="300">
          <v-img
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          ></v-img>
          <v-card-text class="text-center">
            <v-form>
              <v-text-field
                label="Email"
                type="text"
                prepend-inner-icon="mdi-mail"
              ></v-text-field>

              <v-text-field
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>

              <v-btn
                :loading="buttonsLoading"
                block
              >
                Sign in
              </v-btn>
            </v-form>
            <v-divider class="ma-4"></v-divider>

            <v-btn
              @click="signinWithGoogle"
              :loading="buttonsLoading"
              color="green"
              variant="outlined"
              block
            >
              <v-icon icon="mdi-google"></v-icon>
            </v-btn>

            <v-btn
              class="mt-2"
              color="blue"
              variant="outlined"
              block
              :loading="buttonsLoading"
            >
              <v-icon icon="mdi-facebook"></v-icon>
            </v-btn>

            <v-btn
              class="text-white mt-2"
              color="blue-lighten-2"
              variant="outlined"
              block
              :loading="buttonsLoading"
            >
              <v-icon icon="mdi-twitter"></v-icon>
            </v-btn>

            <v-btn
              class="mt-2"
              color="white"
              variant="outlined"
              block
              :loading="buttonsLoading"
            >
              <v-icon icon="mdi-github"></v-icon>
            </v-btn>

            <p class="text-caption grey-text mt-8">
              Don't have an account? <router-link to="/signup">Sign up here.</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
