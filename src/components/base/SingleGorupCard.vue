<template>
  <v-card :to="'group/'+groupId">
    <v-card-text>
      <v-list-item class="grow" two-line>
        <v-avatar class="mr-4" color="orange" size="62">
          <span class="white--text text-h5 white--text">D</span>
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h5 font-weight-regular">
            {{groupName}}
          </v-list-item-title>
          <v-list-item-subtitle> {{isOwner ? 'Owner' : ''}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import Config from "../../services/config";
export default {
  props:{
    groupId: String,
    groupName: String,
    isOwner: Boolean,
  }
};
</script>

