<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row align="center">
              <v-col cols="8" md="8">
                <v-text-field
                  append-icon="mdi-account-search"
                  name="input-10-1"
                  label="Person Name"
                  v-model="searchKey"
                />
              </v-col>

              <v-col cols="2" md="2" class="mr-2 ml-2" align="end">
                <v-btn
                  elevation="0"
                  fab
                  dark
                  color="primary"
                  v-on:click="searchFriends()"
                >
                  <v-icon dark> mdi-account-search </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-card color="primary" style="width: 250px;" v-if="users.length == 0 && isSeachStarted">
              <v-card-text class="white--text" v-on:click="showInvite()">
                Click here to invite friend
              </v-card-text>
            </v-card>
            <template v-for="(item, index) in users">
              <base-single-friend-search-card
                :index="index"
                :key="index + 1"
                :name="item.name"
                :email="item.email"
                :isRequest="!isGroupSearch"
                v-on:click="select(item)"
                @sendRequest="sendRequest"
              />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <template v-if="isInvite">
        <v-col cols="12" md="6">
          <base-material-card color="orange">
            <template v-slot:heading>
              <span class="text-h3 font-weight-bold">
                Friend Invite
              </span>
            </template>
            <v-form ref="form">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[emailRule.required, emailRule.validate]"
              />
              <span class="font-weight-bold text-h4"
                >This link will be expired after:
              </span>
              <span> {{ expiryDate }} </span>
              <br />
              <br />
              <v-btn color="red" v-on:click="clear()"> Clear </v-btn>
              <v-btn class="mr-4" color="primary" v-on:click="createLink()">
                Submit
              </v-btn>
            </v-form>
          </base-material-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { emailVlidation } from "@/utils/validation";
import AlertHandler from "@/utils/alertHandle";
import moment from "moment-timezone";
import SearchService from "@/services/search";
import FriendService from "@/services/friends";
import alertHandle from "../../../../utils/alertHandle";
export default {
  data() {
    return {
      isGroupSearch: false,
      isInvite: false,
      isSeachStarted: false,
      searchKey: "",
      users: [],
      email: "",
      expiryDate: "",
      emailRule: {
        required: (value) => !!value || "Please enter your email",
        validate: (v) => emailVlidation(v) || "Your email address is not valid",
      },
    };
  },
  mounted() {
    if (this.$route.meta.isGroup) {
      this.isGroupSearch = true;
    }
    var date = new Date();
    var formattedDate = moment(date).format("YYYY-MM-DD");
    this.expiryDate = moment(formattedDate).format("LL");
  },
  methods: {
    searchFriends() {
      if (this.searchKey) {
        this.isInvite = false;
        this.isSeachStarted = true;
        if (this.isGroupSearch) {
           const payload = {
            keyword: this.searchKey,
            userId: JSON.parse(localStorage.getItem("user")).userId,
            searchType: "1",
          };
          SearchService.searchPeople(payload)
            .then((res) => {
              if (res.data.body.friends) {
                this.users = res.data.body.friends;
              }
            })
            .catch((err) => {
              console.log("error");
            });
        } else {
          const payload = {
            keyword: this.searchKey,
            userId: JSON.parse(localStorage.getItem("user")).userId,
            searchType: "3",
          };
          SearchService.searchPeople(payload)
            .then((res) => {
              if (res.data.body.users) {
                this.users = res.data.body.users;
              }
            })
            .catch((err) => {
              console.log("error");
            });
        }
      }
    },
    showInvite() {
      this.email = this.searchKey;
      this.isInvite = true;
    },
    clear() {
      this.$refs.form.reset();
    },
    createLink() {
      if (this.$refs.form.validate()) {
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          email: this.email,
        };

        FriendService.createInvite(payload)
          .then((res) => {
            if (res.data.code == 200) {
              this.isGroupSearch ? this.$router.back() :this.$router.push("/invites");
            }
          })
          .catch((res) => {
            AlertHandler.errorMessage(res.message);
          });
      }
    },
    sendRequest(index) {
      const singleUser = this.users[index];
      if (singleUser) {
        console.log(singleUser);
        if (!this.isGroupSearch) {
          const payload = {
            userId: JSON.parse(localStorage.getItem("user")).userId,
            friendId: singleUser.userId,
          };
          FriendService.sendRequest(payload)
            .then((res) => {
              if (res.data.code == 200) {
                this.$router.push("/friends");
              }
            })
            .catch((res) => {
              AlertHandler.errorMessage(res.message);
            });
        } else {
          this.$router.back();
        }
      }
    },
  },
};
</script>
