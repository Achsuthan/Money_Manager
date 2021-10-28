<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
        crossorigin="anonymous"
      />
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Share on Social Media</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <div class="share-network-list">
            <ShareNetwork
              v-for="network in networks"
              :network="network.network"
              :key="network.network"
              :style="{ backgroundColor: network.color }"
              :url="sharing.url"
              :title="sharing.title"
              :description="sharingText"
              :hashtags="sharing.hashtags"
            >
              <i :class="network.icon"></i>
              <span>{{ network.name }}</span>
            </ShareNetwork>
          </div>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>

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
            <small style="font-size: 12px"> {{ transactionType }}</small>
            $ {{ value }}
          </h3>
          <h4 class="text-h4 font-weight-light text--primary">
            {{ date }}
          </h4>
          <h4 class="text-h4 font-weight-light text--primary">
            {{ category }}
          </h4>
        </div>
      </template>

      <v-icon :color="subIconColor" size="16" class="ml-2 mr-1">
        {{ subIcon }}
      </v-icon>
      <span
        :class="subTextColor"
        class="text-caption grey--text font-weight-light"
        v-text="subText"
      />
      <v-btn
        small
        v-if="friends"
        @click="OnClickFn()"
        elevation="0"
        fab
        dark
        color="primary small ml-auto text-center"
      >
        <v-icon dark>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <v-col cols="12" class="px-0">
        <v-expand-transition>
          <v-card class="pa-3" v-show="show">
            <div>
              <p v-if="isOwn">
                <span style="font-size: 20px"> I Spent </span>
                <br />
                <br />
                <template v-for="(friend, index) in friends">
                  <v-chip class="p-3 mr-4" :key="index + 1">
                    <span style="font-size: 16px">
                      $ {{ friend.amount }} to
                      {{ friend.userId == userId ? "you" : friend.name }}
                    </span>
                  </v-chip>
                </template>
                <v-btn
                  small
                  @click="share(friends, true, 'I')"
                  elevation="0"
                  fab
                  dark
                  color="primary small ml-auto text-center"
                >
                  <v-icon dark>mdi-share</v-icon>
                </v-btn>
              </p>
              <p v-else>
                <span style="font-size: 20px">
                  {{ friends && friends.length > 0 && friends[0].name }} Spent
                </span>
                <br />
                <br />

                <template v-for="(friend, index) in transactionFriends">
                  <v-chip class="p-3 mr-4" :key="index">
                    <span style="font-size: 16px">
                      $ {{ friend.amount }} to
                      {{ friend.userId == userId ? "you" : friend.userName }}
                    </span>
                  </v-chip>
                </template>
                <v-btn
                  small
                  @click="
                    share(
                      transactionFriends,
                      false,
                      friends && friends.length > 0 && friends[0].name
                    )
                  "
                  elevation="0"
                  fab
                  dark
                  color="primary small ml-auto text-center"
                >
                  <v-icon dark>mdi-share</v-icon>
                </v-btn>
              </p>
            </div>
          </v-card>
        </v-expand-transition>
      </v-col>
    </base-material-card>
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
    type: {
      type: String,
      default: "friend",
    },
    groupId: {
      type: String,
      default: undefined,
    },
    groupName: {
      type: String,
      default: "",
    },
    transactionType: {
      type: String,
      default: "",
    },
    category:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      transactionFriends: [],
      dialog: false,
      sharingText: "",
      userId: "",
      sharing: {
        url: "http://localhost:8081",
        title: "Money Manager",
        hashtags: "money, manager, spending",
      },
      networks: [
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa-skype",
          color: "#00aff0",
        },
        {
          network: "sms",
          name: "SMS",
          icon: "far fah fa-lg fa-comment-dots",
          color: "#333333",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("user")).userId;
  },
  methods: {
    async OnClickFn() {
      let show = !this.show;
      this.show = show;
      if (!this.isOwn && show && this.transactionFriends.length == 0) {
        let payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          transactionId: this.transactionId,
        };
        if (this.type != "friend") {
          payload.groupId = this.groupId;
        }
        let { data } = await TransactionService.getFriendsTransaction(
          this.type,
          payload
        );
        this.transactionFriends = data.body.users;
      }
    },
    share(friends, isOwn, senderUser) {
      let string = `${senderUser} transfer money`;
      if (isOwn) {
        string += "\n";
        friends.forEach((friend, index) => {
          string += `$ ${friend.amount} to ${friend.name}`;
          if (index < friends.length - 1) {
            string += "\n";
          }
        });
      } else {
        string += " to Us \n";
        friends.forEach((friend, index) => {
          string += `$ ${friend.amount} to ${friend.userName}`;

          if (index < friends.length - 1) {
            string += "\n";
          }
        });
      }
      if (this.groupName) {
        string += `\non '${this.groupName}' group`;
      }
      this.sharingText = string;
      this.dialog = true;
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



<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
h1 {
  text-align: center;
  margin: 50px 0 80px;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^="share-network-"] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none !important;
  margin: 0 10px 10px 0;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  color: white;
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>
