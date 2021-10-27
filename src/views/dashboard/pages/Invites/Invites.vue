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
                  <v-btn
                    elevation="0"
                    fab
                    dark
                    color="primary"
                    to="/search_friends"
                  >
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
              :email="invite.email"
              :isDelete="true"
              @deleteFriendsInvite="deleteFriendsInvite"
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
            </v-list-item>
          </template>
          <br />
          <template v-if="rceiveInvites.length > 0">
            <v-list-item-title class="text-h5 font-weight-regular">
              Receive Invites
            </v-list-item-title>

            <template v-for="item in rceiveInvites">
              <base-group-invitation-card
                :key="item.groupInviteId"
                :link="item.inviteLink"
                :inviteId="item.groupInviteId"
                :isReceive="true"
                @deleteGroupInvitation="deleteGroupInvitation"
                @acceptInvite="acceptInvitation"
                :description="getDescription(item, true)"
              />
            </template>
            <br />
          </template>

          <template v-if="sendInvites.length > 0">
            <v-list-item-title class="text-h5 font-weight-regular">
              Send Invites
            </v-list-item-title>
            <template v-for="item in sendInvites">
              <base-group-invitation-card
                :key="item.groupInviteId"
                :link="item.inviteLink"
                :inviteId="item.groupInviteId"
                :isReceive="false"
                @deleteGroupInvitation="deleteGroupInvitation"
                :description="getDescription(item, false)"
              />
            </template>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FriendsInvite from "@/services/Invite";
import AlertHandler from "@/utils/alertHandle";
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
        .catch((res) => {
          AlertHandler.errorMessage(res.message);
        });
    },

    getGroupInvites() {
      let payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      };
      FriendsInvite.getAllGroupInvites(payload)
        .then((res) => {
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
    deleteFriendsInvite(inviteId) {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        inviteId: inviteId,
      };
      FriendsInvite.deleteFriendInviteId(payload)
        .then((res) => {
          if (res.data.code == 200) {
            this.getAllInvites();
          }
        })
        .catch((res) => {
          AlertHandler.errorMessage(res.message);
        });
    },
    deleteGroupInvitation(invitationId) {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        groupInviteId: invitationId,
      };
      FriendsInvite.deleteGroupInviteId(payload)
        .then((res) => {
          if (res.data.code == 200) {
            this.getGroupInvites();
          }
        })
        .catch((res) => {
          AlertHandler.errorMessage(res.message);
        });
    },
    acceptInvitation(invitationId) {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        groupInviteId: invitationId,
      };
      FriendsInvite.acceptGroupInvite(payload)
        .then((res) => {
          if (res.data.code == 200) {
            this.getGroupInvites();
          }
        })
        .catch((res) => {
          AlertHandler.errorMessage(res.message);
        });
    },
    getDescription(item, isRecive) {
      if (isRecive) {
        return (
          item.sender.name +
          " has request you to join to " +
          item.groupName +
          "group"
        );
      } else {
        return (
          "You requested " +
          item.receiver.name +
          " to join to " +
          item.groupName +
          "group"
        );
      }
    },
  },
};
</script>
