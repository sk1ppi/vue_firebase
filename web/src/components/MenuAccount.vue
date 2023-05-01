<template>
  <div>
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="mr-2"
          icon="mdi-dots-vertical"
        >
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
