<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  Friends Transactions
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-bold">
                  You owes Senthuran $13
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-list-item-title class="text-h1 font-weight-regular">
                    $145
                    <v-list-item-subtitle class="font-weight-bold">
                      Total balance
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
          
          <template v-for="item in friendsTransactions">
            <base-material-stats-card
              :color="item.category.color"
              :icon="item.category.imageName"
              :title="item.transactionName"
              :value="'$' + item.amount"
              :date="getDate(item.date)"
              :key="item.transactionId"
            />
          </template>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  Own Transactions
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title class="text-h5 font-weight-regular">
                  <v-list-item-title class="text-h1 font-weight-regular">
                    $145
                    <v-list-item-subtitle class="font-weight-bold">
                      Total balance
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-col>
            <v-row>
              <v-col class="text-right">
                <v-btn color="success" rounded class="mx-2" to="/add_expenses">
                  Add Expenses
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <template v-for="item in ownTransacitons">
            <base-material-stats-card
              :color="item.category.color"
              :icon="item.category.imageName"
              :title="item.transactionName"
              :value="'$' + item.amount"
              :date="getDate(item.date)"
              :key="item.transactionId"
            />
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionService from "@/services/transaction";
import CommonUtil from '@/utils/common'
export default {
  data: () => ({
    ownTransacitons: [],
    friendsTransactions:[],
  }),
  created() {
    this.getOwnTransacitons();
    this.getFriendsTransacitons();
  },
  methods: {
    getOwnTransacitons() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        transactionTo: "personal",
      };
      TransactionService.getTransactions(payload)
        .then((res) => {
          console.log(res);
          if (res.data.body.transactions) {
            this.ownTransacitons = res.data.body.transactions;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFriendsTransacitons() {
      const payload = {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        transactionTo: "friend",
      };
      TransactionService.getTransactions(payload)
        .then((res) => {
          console.log(res);
          if (res.data.body.transactions) {
            this.friendsTransactions = res.data.body.transactions;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDate(dateString){
      return CommonUtil.getDate(dateString);
    }
    
  },
};
</script>
