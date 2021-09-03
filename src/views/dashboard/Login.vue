<template>
  <v-app
    :style="primary"
  >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      min-width="360px"
    >
      <v-container
        id="user-profile"
        fluid
        tag="section"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h2 font-weight-light">
              Login
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    class="purple-input"
                  />
                </v-col>

                <v-list-item
                  class="grow ma-0 ma-0"
                  two-line
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-h5 font-weight-regular"
                    >
                      <v-btn
                        class="blue--text ma-0 pa-0"
                        color="transparent"
                        elevation="0"
                      >
                        Register
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content class="text-right">
                    <v-list-item-title
                      class="text-h5 font-weight-regular"
                    >
                      <v-col
                        cols="12"
                        class="text-right"
                      >
                        <v-btn
                          color="success"
                          class="mr-4"
                        >
                          Login
                        </v-btn>
                        <v-btn
                          color="red"
                          class="mr-0"
                        >
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

  export default {
    name: 'DashboardIndex',
    computed: {
      passwordMatch () {
        return () => this.password === this.verify || 'Password must match'
      },
    },
    methods: {
      validate () {
        if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    data: () => ({
      dialog: true,
      ab: 0,
      valid: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verify: '',
      loginPassword: '',
      loginEmail: '',
      loginEmailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters',
      },
    }),
  }
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
