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
        <v-list-item-content class="text-right">
          <v-col>
            <v-icon
            v-if="isReceive"
              class="mr-8"
              color="primary"
              v-on:click="$emit('acceptRequest', friendsId)"
            >
              mdi mdi-check
            </v-icon>
            <v-icon
            v-if="!isFriend"
              class="mr-0"
              color="red"
              v-on:click="$emit('deleteFriendRequest', friendsId)"
            >
              mdi-delete
            </v-icon>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props:{
    friendsId: String,
    name: String,
    email: String,
    isReceive: Boolean,
    isFriend: Boolean
  }
}
</script>

