<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow ma-0 ma-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  Friends Invitation
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-btn elevation="0" fab dark color="primary">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-for="invite in friendInvites">
            <base-invitation-card
              :key="invite.inviteId"
              :link="invite.link"
              :inviteId="invite.inviteId"
              :isFriend="true"
            />
          </template>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow ma-0 ma-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  Group Invitations
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-btn elevation="0" fab dark color="primary">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <br />
          <template v-if="rceiveInvites.length > 0">
            <v-list-item-title class="text-h5 font-weight-regular">
              Receive Invites
            </v-list-item-title>

            <template v-for="item in rceiveInvites">
              <base-group-invitation-card :key="item.groupInviteId" :link="item.inviteLink" :inviteId="groupInviteId" :isReceive="true"/>
            </template>
            <br />
          </template>

          <template v-if="sendInvites.length > 0">
            <v-list-item-title class="text-h5 font-weight-regular">
              Receive Invites
            </v-list-item-title>
            <template v-for="item in sendInvites">
              <base-group-invitation-card :key="item.groupInviteId" :link="item.inviteLink" :inviteId="groupInviteId" :isReceive="false"/>
            </template>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FriendsInvite from "../../../../services/friendInvite";
import AlertHandler from "../../../../utils/alertHandle";
export default {
  data: () => ({
    friendInvites: [],
    rceiveInvites: [],
    sendInvites: [],
  }),
  created() {
    this.getAllInvites();
    this.getGroupInvites();
  },
  methods: {
    getAllInvites() {
      let payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      };
      FriendsInvite.getAllInvites(payload)
        .then((res) => {
          if (res.data.body.invites) {
            this.friendInvites = res.data.body.invites;
          }
        })
        .catch((err) => {
          AlertHandler.errorMessage(err.message);
        });
    },

    getGroupInvites() {
      let payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      };
      FriendsInvite.getAllGroupInvites(payload)
        .then((res) => {
          console.log(res)
          if (res.data.body.receiveRequest) {
            this.rceiveInvites = res.data.body.receiveRequest;
          }

          if (res.data.body.sendRequest) {
            this.sendInvites = res.data.body.sendRequest;
          }
        })
        .catch((err) => {
          AlertHandler.errorMessage(err.message);
        });
    },
  },
};
</script>
