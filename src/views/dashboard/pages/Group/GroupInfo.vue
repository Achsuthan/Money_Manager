<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card
          color="orange"
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-bold">
              Group Name
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Senthuran owes you $13
            </div>
          </template>

          <v-col>
            <v-row>
              <v-col>
                <v-btn
                  color="success"
                  rounded
                  class="mr-0"
                  to="/add_expenses"
                >
                  Settle up
                </v-btn>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  color="success"
                  rounded
                  class="mx-2"
                  to="/add_expenses"
                >
                  Add Expenses
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <base-material-stats-card
            color="orange"
            icon="mdi-food"
            title="Pizza with Senthuran"
            value="$ 184"
            sub-text="Senthuran paid to you"
            date="28th Aug"
          />
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          color="orange"
          title="Group Informations"
        >
          <v-list-item
            class="grow"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-h5 font-weight-regular"
              >
                Participants
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
                  to="/search_friends_group"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <base-single-person-card />
          <v-list-item
            class="grow mt-12"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-h5 font-weight-regular"
              >
                Invitations
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
