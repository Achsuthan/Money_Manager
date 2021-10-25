<template>
  <v-card elevation="2">
    <v-card-text>
      <v-list-item class="grow" two-line>
        <v-col cols="8" md="8">
          <v-list-item-content>
            <v-list-item-title class="text-h3 font-weight-regular">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-col cols="4" md="4">
          <v-list-item-content class="text-right">
            <v-btn class="mr-4" color="primary" v-on:click="sendRequest()"
              >{{isRequest ? 'Add Friend' : 'Add to Group'}}</v-btn
            >
          </v-list-item-content>
        </v-col>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    index: Number,
    name: String,
    email: String,
    isRequest: Boolean
  },
  methods: {
    sendRequest() {
      this.$emit("sendRequest", this.index);
    },
  },
};
</script>

