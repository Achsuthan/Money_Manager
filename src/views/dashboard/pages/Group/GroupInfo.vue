<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="orange">
          <template v-slot:heading>
            <div class="text-h3 font-weight-bold">{{groupName}}</div>

            <div class="text-subtitle-1 font-weight-light">
              Senthuran owes you $13
            </div>
          </template>

          <v-col>
            <v-row>
              <v-col>
                <v-btn color="success" rounded class="mr-0" to="/add_expenses">
                  Settle up
                </v-btn>
              </v-col>
              <v-col class="text-right">
                <v-btn color="success" rounded class="mx-2" to="/add_expenses">
                  Add Expenses
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <template v-for="(item, index) in groupTransactions">
            <base-material-stats-card
              :key="index + 1"
              :color="item.category.categoryColor"
              :icon="item.category.imageName"
              :title="item.transactionName"
              :value="'$' +item.amount"
              :sub-text="item.transactionDescription"
              :date="getDate(item.date)"
            />
          </template>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card color="orange" title="Group Informations">
          <v-list-item class="grow" two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 font-weight-regular">
                Participants
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="text-right">
              <v-list-item-title class="text-h5 font-weight-regular">
                <v-btn
                  elevation="0"
                  fab
                  dark
                  color="primary"
                  :to="'/search_friends_group/'+ this.groupId"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template v-for="(item, index) in users">
            <base-single-person-card
              :key="index + 1"
              :email="item.email"
              :name="item.userName"
            />
          </template>
          <v-list-item class="grow mt-12" two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 font-weight-regular">
                Invitations
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template v-for="(item, index) in groupInvites">
            <base-invitation-card
              :key="index + 1"
              :link="item.inviteLink"
              :inviteId="item.groupInviteId"
              :email="item.receiver.email"
            />
            <!-- @deleteFriendsInvite="deleteFriendsInvite" -->
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionService from "@/services/transaction";
import GroupService from "@/services/groups";
import CommonUtil from '@/utils/common'
export default {
  data: () => ({
    groupTransactions: [],
    users: [],
    groupInvites: [],
    groupId: "",
    groupName: "",
  }),
  created() {
    this.groupId = this.$route.params.id;
    this.getTransacitons();
    this.getUsersBasedOnGroup();
    this.getInviteLinks();
  },
  methods: {

    getDate(dateString){
      return CommonUtil.getDate(dateString);
    },
    getTransacitons() {
      if (this.groupId) {
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          transactionTo: "group",
          groupId: this.groupId
        };
        TransactionService.getTransactions(payload)
          .then((res) => {
            console.log(res);
            if (res.data.body.transactions) {
              this.groupTransactions = res.data.body.transactions;
            }

            if(res.data.body.groupName){
              this.groupName = res.data.body.groupName
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getUsersBasedOnGroup() {
      if (this.groupId) {
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          groupId: this.groupId,
        };
        GroupService.getUsers(payload)
          .then((res) => {
            if (res.data.body.users) {
              this.users = res.data.body.users;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getInviteLinks() {
      if (this.groupId) {
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          groupId: this.groupId,
        };
        GroupService.getInvite(payload)
          .then((res) => {
            if (res.data.body.groupInvites) {
              this.groupInvites = res.data.body.groupInvites;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
