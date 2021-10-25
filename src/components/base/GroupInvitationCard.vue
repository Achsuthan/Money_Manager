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
              {{siteBaseUrl + "groupInvite=" + link}}
            </a>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-right">
          <v-col>
            <!-- <v-icon class="mr-0" color="red" v-on:click="deleteInvite()"> mdi-delete </v-icon> -->
            <v-icon v-if="isReceive" class="ml-4" color="green" v-on:click="$emit('acceptInvite',inviteId)"> mdi-check </v-icon>
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
    isReceive: Boolean
  },
  data: ({ 
    siteBaseUrl:"",
  }),
  created(){
    this.siteBaseUrl = Config.siteBaseUrl
  },
};
</script>

