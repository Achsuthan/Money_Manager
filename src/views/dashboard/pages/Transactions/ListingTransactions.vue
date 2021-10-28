<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow pa-0" three-line>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular text-wrap"
                >
                  Friends Transactions
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-bold">
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-list-item-title class="text-h2 font-weight-regular">
                    $ {{ received.toFixed(2) }}
                    <v-list-item-subtitle class="font-weight-bold">
                      Received
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h4 font-weight-regular">
                  <v-list-item-title class="text-h2 font-weight-regular">
                    $ {{ spent.toFixed(2) }}
                    <v-list-item-subtitle class="font-weight-bold">
                      Transfered
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-col>
            <v-row>
              <v-col> </v-col>
              <v-col class="text-right">
                <v-btn
                  color="success"
                  rounded
                  class="mx-2"
                  to="/add_transaction/friend/"
                >
                  Add Transaction
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <template v-if="friendsTransactions.length == 0">
            <v-card-text class="grow pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap text-center"
                  >
                    <br />
                    You don't have any {{friends.length >0 ? 'transactions' : 'friends'}}.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap text-center"
                  >
                    <br />
                    <v-btn
                      color="primary"
                      :to="friends.length >0 ? '/add_transaction/friend/' : '/search-friends'"
                    >
                      Add {{friends.length >0 ? 'Transaction' : 'Friend'}}
                    </v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </template>

          <template v-for="item in friendsTransactions">
            <base-material-stats-card
              :color="item.category.color"
              :icon="item.category.imageName"
              :title="item.transactionName"
              :value="getAmount(item)"
              :date="getDate(item.date)"
              :key="item.transactionId"
              :friends="item.friends"
              :isOwn="item.isOwn"
              :isTransactions="true"
              :transactionId="item.transactionId"
              :category="item.category.categoryName"
              :transactionType="item.isOwn ? 'You transfered' : 'You received'"
            />
          </template>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow pa-0" three-line>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular text-wrap"
                >
                  Own Transactions
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-bold">
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-list-item-title class="text-h2 font-weight-regular">
                    $ {{ income.toFixed(2) }}
                    <v-list-item-subtitle class="font-weight-bold">
                      Your total Income
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h4 font-weight-regular">
                  <v-list-item-title class="text-h2 font-weight-regular">
                    $ {{ expenses.toFixed(2) }}
                    <v-list-item-subtitle class="font-weight-bold">
                      Your total Expenses
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-col>
            <v-row>
              <v-col class="text-right">
                <v-btn
                  color="success"
                  rounded
                  class="mx-2"
                  to="/add_transaction/own"
                >
                  Add Transaction
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <template v-if="ownTransacitons.length == 0">
            <v-card-text class="grow pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap text-center"
                  >
                    <br />
                    You don't have any transactions.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap text-center"
                  >
                    <br />
                    <v-btn
                      color="primary"
                      to="/add_transaction/own"
                    >
                      Add Transaction
                    </v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </template>

          <template v-for="item in ownTransacitons">
            <base-material-stats-card
              :color="item.category.color"
              :icon="item.category.imageName"
              :title="item.transactionName"
              :value="item.amount"
              :date="getDate(item.date)"
              :key="item.transactionId"
              :isTransactions="false"
              :transactionId="item.transactionId"
              :category="item.category.categoryName"
              :transactionType="
                item.transactionType.toLowerCase() == 'income'
                  ? 'Your Income '
                  : 'You spent '
              "
            />
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionService from "@/services/transaction";
import CommonUtil from "@/utils/common";
export default {
  data: () => ({
    ownTransacitons: [],
    friendsTransactions: [],
    received: 0.0,
    spent: 0.0,
    income: 0.0,
    expenses: 0.0,
    friends:[],
  }),
  created() {
    this.getOwnTransacitons();
    this.getFriendsTransacitons();
    this.getFriends();
  },
  methods: {
    getOwnTransacitons() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        transactionTo: "personal",
      };
      TransactionService.getTransactions(payload)
        .then((res) => {
          if (res.data.body.transactions) {
            this.ownTransacitons = res.data.body.transactions;
          }

          if (res.data.body.income) {
            this.income = res.data.body.income;
          }

          if (res.data.body.expenses) {
            this.expenses = res.data.body.expenses;
          }
        })
        .catch((err) => {});
    },
    getFriendsTransacitons() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        transactionTo: "friend",
      };
      TransactionService.getTransactions(payload)
        .then((res) => {
          if (res.data.body.transactions) {
            this.friendsTransactions = res.data.body.transactions;
          }
          if (res.data.body.youReceive) {
            this.received = res.data.body.youReceive;
          }
          if (res.data.body.youSpent) {
            this.spent = res.data.body.youSpent;
          }
        })
        .catch((err) => {});
    },
    getFriends() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId
      }
      TransactionService.getAllFriendsByUserId(payload)
        .then((res) => {
          if (res.data.body.friends) {
            this.friends = res.data.body.friends
          }
        })
        .catch((err) => {});
    },
    getDate(dateString) {
      return CommonUtil.getDate(dateString);
    },
    getAmount(item) {
      let amount = 0.0;
      item.friends.forEach((element) => {
        amount += element.amount;
      });
      return amount;
    },
  },
};
</script>
