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
            {{name}}
          </v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props:{
    name: String,
    email: String
  }
};
</script>