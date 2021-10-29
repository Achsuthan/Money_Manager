<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <v-container id="user-profile" fluid tag="section">
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h2 font-weight-light">
              {{ isLogin ? "LOGIN" : "REGISTER" }}
            </div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    :rules="[emailRule.required, emailRule.validate]"
                    :disabled="isEmailDisable"
                    v-model="email"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12" v-if="!isLogin">
                  <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[nameRule.required, nameRule.min]"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    type="password"
                    v-model="password"
                    :rules="[passwordRule.required, passwordRule.min]"
                    label="Password"
                    class="purple-input"
                  />
                </v-col>

                <v-list-item class="grow ma-0 ma-0" two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-regular">
                      <v-btn
                        class="blue--text ma-0 pa-0"
                        color="transparent"
                        elevation="0"
                        v-on:click="switchLoginRegister"
                      >
                        {{ isLogin ? "Register" : "Login" }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content class="text-right">
                    <v-list-item-title class="text-h5 font-weight-regular">
                      <v-col cols="12" class="text-right">
                        <v-btn
                          color="success"
                          class="mr-4"
                          v-on:click="isLogin ? login() : register()"
                        >
                          {{ isLogin ? "Login" : "Register" }}
                        </v-btn>
                        <v-btn color="red" class="mr-0" v-on:click="reset">
                          Clear
                        </v-btn>
                      </v-col>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-container>
    </v-dialog>
  </v-app>
</template>
<script>
import { emailVlidation } from "@/utils/validation";
import LoginService from "@/services/login";
import TransactionService from "@/services/Invite";

import AlertHandler from "@/utils/alertHandle";
export default {
  name: "DashboardIndex",
  data: () => ({
    dialog: true,
    isLogin: true,
    name: "",
    nameRule: {
      required: (value) => !!value || "Please enter your name.",
      min: (v) => !!v || "Min 8 characters",
    },
    password: "",
    passwordRule: {
      required: (value) => !!value || "Please enter your password",
      min: (v) => (v != null && v.length >= 8) || "Min 8 charecters required",
    },
    email: "",
    emailRule: {
      required: (value) => !!value || "Please enter your email",
      validate: (v) => emailVlidation(v) || "Your email address is not valid",
    },
    inviteId: "",
    isEmailDisable: false,
  }),
  mounted() {
    if (this.$route.query.inviteId) {
      this.isLogin = false;
      this.onGetSingleInvite();
    }
  },
  methods: {
    switchLoginRegister() {
      this.$refs.form.reset();
      const isLoginStatus = !this.isLogin;
      this.isLogin = isLoginStatus;
      this.isEmailDisable = false;

      if (!isLoginStatus && this.$route.query.inviteId) {
        this.onGetSingleInvite();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    onGetSingleInvite() {
      let payload = {
        inviteId: this.$route.query.inviteId,
      };
      TransactionService.getSingleInvite(payload)
        .then((res) => {
          this.email = res.data.body.email;
          this.inviteId = res.data.body.inviteId;
          this.isEmailDisable = true;
        })
        .catch((err) => {
          AlertHandler.errorMessage(err.message);
          this.$router.push(`/login`);
        });
    },
    login() {
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          password: this.password,
        };
        LoginService.login(payload)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.body));
            this.$router.push("/");
          })
          .catch((err) => {
            AlertHandler.errorMessage(err.message);
          });
      }
    },
    register() {
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        if (this.$route.query.inviteId) {
          payload.inviteId = this.$route.query.inviteId;
        }

        LoginService.register(payload)
          .then((res) => {
            AlertHandler.successMessage(
              "You have registered successfully, please proceed to login"
            );
            this.$refs.form.reset();
            this.isLogin = true;
            this.isEmailDisable = false
          })
          .catch((err) => {
            AlertHandler.errorMessage(err.message);
            this.switchLoginRegister();
          });
      }
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
