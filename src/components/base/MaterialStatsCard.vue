<template>
  <div>
    <base-material-card
      :icon="icon"
      class="v-card--material-stats"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:after-heading>
        <div class="ml-auto text-right">
          <div
            class="text-body-1 black--text font-weight-bold"
            v-text="title"
          />
          <h3 class="text-h3 font-weight-light text--primary">
            $ {{ value }}
            <small>{{ smallValue }}</small>
          </h3>
          <h4 class="text-h4 font-weight-light text--primary">
            {{ date }}
          </h4>
        </div>
      </template>

      <v-col v-if="subText" cols="12" class="px-0">
        <v-divider />
      </v-col>

      <v-icon :color="subIconColor" size="16" class="ml-2 mr-1">
        {{ subIcon }}
      </v-icon>
      <span
        :class="subTextColor"
        class="text-caption grey--text font-weight-light"
        v-text="subText"
      />
      <v-btn icon @click="OnClickFn()" v-if="isTransactions">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </base-material-card>
    <v-expand-transition>
      <v-card class="pa-3" v-show="show">
        <div>
          <p v-if="isOwn">
            You Spent
            <v-chip class="p-3" v-for="(friend, index) in friends" :key="index">
              {{ friend.amount }} to {{ friend.name }}</v-chip
            >
          </p>
          <p v-else>
            {{ friends[0].name }} Spent
            <v-chip
              class="p-3"
              v-for="(friend, index) in transactionFriends"
              :key="index"
            >
              {{ friend.amount }} to {{ friend.userName }}</v-chip
            >
          </p>
        </div>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
import TransactionService from "@/services/transaction";
import Card from "./Card";

export default {
  name: "MaterialStatsCard",

  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true,
    },
    subIcon: {
      type: String,
      default: undefined,
    },
    subIconColor: {
      type: String,
      default: undefined,
    },
    subTextColor: {
      type: String,
      default: undefined,
    },
    subText: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: Number,
      default: undefined,
    },
    date: {
      type: String,
      default: undefined,
    },
    smallValue: {
      type: String,
      default: undefined,
    },
    friends: {
      type: Array,
      default: undefined,
    },
    isOwn: {
      type: Boolean,
      default: false,
    },
    isTransactions: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      show: false,
      transactionFriends: [],
    };
  },
  methods: {
    async OnClickFn() {
      let show = !this.show;

      this.show = show;
      // alert("Sen2")
      if (!this.isOwn && show && this.transactionFriends.length == 0) {
        let { data } = await TransactionService.getFriendsTransactionbyUserId({
          userId: JSON.parse(localStorage.getItem("user")).userId,
          transactionId: this.transactionId,
        });
        this.transactionFriends = data.body.users;
      }
    },
  },
};
</script>
<style>
.border {
  border-color: grey !important;
}
</style>

<style lang="sass">
.v-card--material-stats
  display: flex
  flex-wrap: wrap
  position: relative

  > div:first-child
    justify-content: space-between

  .v-card
    border-radius: 4px
    flex: 0 1 auto

  .v-card__text
    display: inline-block
    flex: 1 0 calc(100% - 120px)
    position: absolute
    top: 0
    right: 0
    width: 100%

  .v-card__actions
    flex: 1 0 100%
</style>
