<script setup>
import useValidate from '@vuelidate/core'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

const auth = getAuth()
const loading = ref(false)

const form = ref({
  email: '',
  password: {
    password: '',
    confirmPassword: ''
  }
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs(form.value.password.password) }
    }
  }
})

const v$ = useValidate(rules, form)

async function handleSignup() {
  loading.value = true
  const isValid = await v$.value.$validate()

  if (isValid) {
    console.log(form.value.email)
    await createUserWithEmailAndPassword(auth, form.value.email, form.value.password.password).then(
      (response) => console.log(response)
    )
  }
  loading.value = false
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
                v-model="form.email"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                type="text"
                label="Email"
                prepend-inner-icon="mdi-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password.password"
                type="password"
                label="Password"
                @blur="v$.password.password.$touch"
                @input="v$.password.password.$touch"
                :error-messages="v$.password.password.$errors.map((e) => e.$message)"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password.confirmPassword"
                type="password"
                label="Confirm password"
                @blur="v$.password.confirmPassword.$touch"
                @input="v$.password.confirmPassword.$touch"
                :error-messages="v$.password.confirmPassword.$errors.map((e) => e.$message)"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>

              <v-btn
                @click="handleSignup"
                :loading="loading"
                class="mt-2"
                block
              >
                Sign up
              </v-btn>
            </v-form>

            <v-divider class="ma-4"></v-divider>

            <p class="text-caption grey-text mt-8">
              Already have an account? <router-link to="/signin">Sign in here.</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
