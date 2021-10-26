<template>
  <v-card elevation="2">
    <v-card-text class="grow pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="text-h4 font-weight-regular text-wrap">
            <a
              :href="link"
              target="_blank"
              class="green--text"
            >
              {{siteBaseUrl + "friendInvite=" + link}}
            </a>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-h4 font-weight-regular text-wrap">
            <br/>
            Request sent to : <span style="color: black;"> {{email}} </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-right">
          <v-col v-if="isDelete">
            <v-icon class="mr-0" color="red" v-on:click="$emit('deleteFriendsInvite',inviteId)"> mdi-delete </v-icon>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import Config from '../../services/config'
export default {
  props: {
    link: String,
    inviteId: String,
    email: String,
    isDelete: Boolean
  },
  data: ({ 
    siteBaseUrl:""
  }),
  created(){
    this.siteBaseUrl = Config.siteBaseUrl
  },
};
</script>

