<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow pa-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  {{ $route.meta.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Transaction Name"
              v-model="name"
              required
              :rules="nameRules"
            />
            <v-textarea label="Description" v-model="description" required />
            <v-select
              label="Transaction Type"
              :items="transactionTypeList"
              item-text="text"
              item-value="value"
              required
              :rules="transactionRules"
              v-model="transactionType"
            />
            <v-select
              label="Category"
              :items="categoryList"
              item-text="categoryName"
              item-value="categoryID"
              v-model="categoryId"
              :rules="categoryRules"
              required
            />
            <v-text-field
              label="Amount"
              required
              v-model.number="amount"
              @keypress="isNumber($event)"
              :rules="amountRules"
            />

            <v-select
              v-model="selectFriend"
              :items="friendlist"
              attach
              chips
              label="Friend"
              multiple
              item-text="displayText"
              return-object
              v-if="this.$route.meta.type != 'personal'"
            >
              <template v-slot:selection="{ item }">
                <v-chip>
                  <span>{{
                    $route.meta.type == "group"
                      ? `${item.userName} (${item.email})`
                      : $route.meta.type == "friend"
                      ? `${item.name} (${item.email})`
                      : ""
                  }}</span>
                </v-chip>
              </template>
            </v-select>
            <br />
            <v-row justify="start" class="pl-4">
              <span
                class="font-weight-bold text-h4"
                v-if="selectFriend.length > 0"
                >Selected Friend
              </span>
            </v-row>

            <v-row
              justify="center"
              v-for="friend in selectFriend"
              :key="friend.userId"
            >
              <v-col cols="12" md="6">
                <v-card elevation="0" class="text-wrap pa-0">
                  <v-list-item class="grow pa-0">
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        {{
                          $route.meta.type == "group"
                            ? `${friend.userName} \n${friend.email}`
                            : $route.meta.type == "friend"
                            ? `${friend.name} ${friend.email}`
                            : ""
                        }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-spacer />
                    <v-row align="center" justify="end">
                      <v-text-field
                        label="Percentage"
                        required
                        v-model.number="friend.persentage"
                        @keypress="isNumber($event)"
                        :rules="amountRules"
                      />
                    </v-row>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="start" class="pl-4">
              <span class="font-weight-bold text-h4">Selected Date: </span>
              <span class="ml-2"> {{ date ? date : "No date Selected" }} </span>
            </v-row>
            <v-row justify="start" class="pl-4">
              <v-date-picker v-model="date" :max="getMaxDate()" />
            </v-row>

            <v-row justify="start" class="pl-4 pb-4">
              <v-btn color="red" @click="onClear()" class="mr-16 ml-4">
                clear
              </v-btn>
              <v-btn
                class="mr-4"
                color="primary"
                :disabled="isSubmitDisable"
                @click="onSaveTransaction()"
              >
                submit
              </v-btn>
            </v-row>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import transactionService from "@/services/transaction";
import AlertHandler from "@/utils/alertHandle";
import moment from "moment-timezone";

export default {
  data() {
    return {
      name: "",
      description: "",
      transactionTo: "",
      transactionType: "",
      categoryId: "",
      amount: null,
      date: moment(new Date()).format("YYYY-MM-DD"),
      nameRules: [(v) => !!v || "Transaction name is required"],
      transactionRules: [(v) => !!v || "Transaction Type is required"],
      categoryRules: [(v) => !!v || "Category Type is required"],
      amountRules: [(v) => !!v || "Amount Type is required"],
      categoryList: [],
      friendlist: [],
      selectFriend: [],
      isSubmitDisable: false,
    };
  },
  computed: {
    transactionTypeList() {
      switch (this.$route.meta.type) {
        case "personal":
          return [
            { text: "Income", value: "income" },
            { text: "Expenses", value: "expenses" },
          ];
        case "friend":
          return [{ text: "Transfer", value: "transfer" }];
        default:
          return [{ text: "Transfer", value: "transfer" }];
      }
    },
    totalPersentage() {
      return this.selectFriend.length > 0
        ? this.selectFriend.reduce((a, b) => a.persentage + b.persentage)
        : 0;
    },
  },
  watch: {
    totalPersentage(val) {
      if (val > 100) {
        AlertHandler.errorMessage("Percentage can't be more than 100");
      }
    },
  },
  mounted() {
    let payload = { userId: JSON.parse(localStorage.getItem("user")).userId };

    transactionService
      .getAllCategories()
      .then((res) => {
        this.categoryList = res.data.body.categories;
      })
      .catch((err) => {
        AlertHandler.errorMessage(err.message);
        this.isSubmitDisable = true;
      });

    switch (this.$route.meta.type) {
      case "personal":
        this.transactionTo = "personal";
        break;
      case "friend":
        this.transactionTo = "friend";
        this.transactionType = "transfer";
        transactionService
          .getAllFriendsByUserId(payload)
          .then((res) => {
            if (res.data.body.friends.length == 0) {
              AlertHandler.errorMessage("Please add some friends");
              this.isSubmitDisable = true;
            }
            this.friendlist = res.data.body.friends.map((x, index) => {
              return {
                ...x,
                displayText: `${x.name} (${x.email})`,
                persentage: null,
              };
            });
          })
          .catch((err) => {
            AlertHandler.errorMessage(err.message);
            this.isSubmitDisable = true;
          });

        break;
      case "group":
        this.transactionTo = "group";
        this.transactionType = "transfer";
        payload.groupId = this.$route.params.groupId;
        transactionService
          .getAllGroupFriendsByUserId(payload)
          .then((res) => {
            if (res.data.body.users.length == 0) {
              AlertHandler.errorMessage("Please add some friends to the group");
              this.isSubmitDisable = true;
            }

            this.friendlist = res.data.body.users.map((x) => {
              return {
                ...x,
                displayText: `${x.userName} (${x.email})`,
                persentage: null,
              };
            });
          })
          .catch((err) => {
            AlertHandler.errorMessage(err.message);
            this.isSubmitDisable = true;
          });
        break;
      default:
        this.transactionTo = "";
        break;
    }
  },
  methods: {
    onSaveTransaction() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        let payload = {
          name: this.name,
          amount: parseFloat(this.amount).toFixed(2),
          date: this.date,
          categoryId: this.categoryId,
          userId: JSON.parse(localStorage.getItem("user")).userId,
          transactionTo: this.transactionTo,
          transactionType: this.transactionType,
          description: this.description,
        };

        if (this.$route.meta.type !== "personal") {
          payload.friends = this.selectFriend.map((x) => {
            return {
              friendId: x.userId,
              persentage: x.persentage.toFixed(2),
            };
          });
        }

        if (this.$route.meta.type === "group") {
          payload.groupId = this.$route.params.groupId;
        }

        if (this.totalPersentage > 100) {
          AlertHandler.errorMessage("Percentage can't be more than 100");
          return;
        }

        transactionService
          .addTransactions(payload)
          .then((res) => {
            AlertHandler.successMessage(res.data.message);
            this.$router.back();
          })
          .catch((err) => {
            AlertHandler.errorMessage(err.message);
          });
      }
    },
    onClear() {
      this.$refs.form.reset();
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getMaxDate() {
      var date = new Date();
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>
