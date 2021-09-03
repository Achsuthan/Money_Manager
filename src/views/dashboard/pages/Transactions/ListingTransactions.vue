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
        <v-card
          color="orange pa-4"
        >
          <v-list-item
            class="grow"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-h2 font-weight-regular white--text"
              >
                Total Balance
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="text-right">
              <v-list-item-title
                class="text-h5 font-weight-regular"
              >
                <v-list-item-title
                  class="text-h1 font-weight-regular white--text"
                >
                  $290
                </v-list-item-title>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
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
              class="grow pa-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Friends Transactions
                </v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold"
                >
                  You owes Senthuran $13
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  <v-list-item-title
                    class="text-h1 font-weight-regular"
                  >
                    $145
                    <v-list-item-subtitle
                      class="font-weight-bold"
                    >
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
        md="6"
      >
        <base-material-card
          color="orange"
        >
          <template v-slot:heading>
            <v-list-item
              class="grow pa-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Own Transactions
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  <v-list-item-title
                    class="text-h1 font-weight-regular"
                  >
                    $145
                    <v-list-item-subtitle
                      class="font-weight-bold"
                    >
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
            date="28th Aug"
          />
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
