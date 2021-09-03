<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="orange"
        >
          <template v-slot:heading>
            <v-list-item
              class="grow ma-0 ma-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Friends Invitation
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  <v-btn
                    elevation="0"
                    fab
                    dark
                    color="primary"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <base-invitation-card />
          <base-invitation-card />
          <base-invitation-card />
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="orange"
        >
          <template v-slot:heading>
            <v-list-item
              class="grow ma-0 ma-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Group Invitations
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  <v-btn
                    elevation="0"
                    fab
                    dark
                    color="primary"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <base-invitation-card />
          <base-invitation-card />
          <base-invitation-card />
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    //
  }
</script>
