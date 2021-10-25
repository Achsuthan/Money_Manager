<template>
  <v-container id="user-profile" fluid tag="section">
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="orange"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Friends
          <v-icon>mdi-account-group</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Send Request
          <v-icon>mdi-account-arrow-right</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Receive Request
          <v-icon>mdi-account-arrow-left</v-icon>
        </v-tab>
      </v-tabs>

      <v-list-item-content class="text-right">
        <v-list-item-title class="text-h5 font-weight-regular mr-6">
          <v-btn elevation="0" fab dark color="primary" to="search_friends">
            <v-icon dark> mdi-account-plus </v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item-content>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <v-card flat class="mr-8 ml-8">
            <template v-if="i == 1 && friends.length > 0">
              <template v-for="item in friends">
                <base-single-friend-card
                  :key="item.friendsId"
                  :name="item.name"
                  :email="item.email"
                  :isReceive="false"
                  :isFriend="true"
                  :friendsId="item.friendsId"
                />
              </template>
            </template>

            <template v-else-if="sentRequest.length > 0 && i == 2">
              <template v-for="item in sentRequest">
                <base-single-friend-card
                  :key="item.friendsId"
                  :name="item.name"
                  :email="item.email"
                  :isReceive="false"
                  :isFriend="false"
                  @deleteFriendRequest="deleteFriendRequest"
                  :friendsId="item.friendsId"
                />
              </template>
            </template>
            <template v-else-if="i == 3 && receiveRequest.length > 0">
              <template v-for="item in receiveRequest">
                <base-single-friend-card
                  :key="item.friendsId"
                  :name="item.name"
                  :email="item.email"
                  :isReceive="true"
                  :isFriend="false"
                  @deleteFriendRequest="deleteFriendRequest"
                  @acceptRequest="acceptRequest"
                  :friendsId="item.friendsId"
                />
              </template>
            </template>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import FriendService from "../../../../services/friends";
export default {
  data: () => ({
    tab: null,
    friends: [],
    sentRequest: [],
    receiveRequest: [],
  }),
  created() {
    this.getAllFriends();
  },
  methods: {
    getAllFriends() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      };
      FriendService.getAllFriends(payload)
        .then((res) => {
          if (res.data.body.friends) {
            this.friends = res.data.body.friends;
          }

          if (res.data.body.sentRequest) {
            this.sentRequest = res.data.body.sentRequest;
          }

          if (res.data.body.receiveRequest) {
            this.receiveRequest = res.data.body.receiveRequest;
          }
        })
        .catch((res) => {
          AlertHandler.errorMessage(err.message);
        });
    },
    deleteFriendRequest(requestId){
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        friendRequestId: requestId
      }

      FriendService.deleteFriendReqeust(payload)
        .then((res) => {
          this.getAllFriends()
        })
        .catch((res) => {
          AlertHandler.errorMessage(err.message);
        });
    },
    acceptRequest(requestId) {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        friendsRequestId: requestId,
      }

      FriendService.acceptFriendRequest(payload)
        .then((res) => {
          this.getAllFriends()
        })
        .catch((res) => {
          AlertHandler.errorMessage(err.message);
        });
    },
  },
};
</script>
