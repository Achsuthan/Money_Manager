<template>
  <v-card
    elevation="2"
  >
    <v-card-text>
      <v-list-item
        class="grow"
        two-line
      >
        <v-list-item-content>
          <v-list-item-title
            class="text-h3 font-weight-regular"
          >
            Senthruan
          </v-list-item-title>
          <v-list-item-subtitle>You owes Senthuran $13</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-right">
          <v-col>
            <v-icon
              class="mr-8"
              color="primary"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              class="mr-0"
              color="red"
            >
              mdi-delete
            </v-icon>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>
