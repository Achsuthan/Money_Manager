<template>
  <v-card elevation="2">
    <v-card-text class="grow pa-0">
      <v-list-item>
        <v-list-item-content>

          <v-list-item-subtitle class="text-h4 font-weight-regular text-wrap">
            <br/>
          {{description}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-right">
          <v-col>
            <v-icon class="mr-0" color="red" v-on:click="$emit('deleteGroupInvitation',inviteId)"> mdi-delete </v-icon>
            <v-btn v-if="isReceive" class="ml-4" color="green" v-on:click="$emit('acceptInvite',inviteId)"> Accept Inviation </v-btn>
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
    isReceive: Boolean,
    description: String
  },
  data: ({ 
    siteBaseUrl:"",
  }),
  created(){
    this.siteBaseUrl = Config.siteBaseUrl
  },
};
</script>

