<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="10"
      >
        <v-card
          elevation="2"
        >
          <v-card-text>
            <br>
            <v-row justify="end">
              <v-btn
                color="success"
              >
                Create Group
              </v-btn>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="12"
                md="8"
              >
                <v-card
                  color="orange pa-4"
                  class=""
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
                          $145
                        </v-list-item-title>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <v-row
              justify="center"
            >
              <v-col
                cols="12"
                md="6"
              >
                <v-card to="group_info">
                  <v-card-text>
                    <v-list-item
                      class="grow"
                      two-line
                    >
                      <v-avatar
                        class="mr-4"
                        color="orange"
                        size="62"
                      >
                        <span class="white--text text-h5 white--text">D</span>
                      </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          class="text-h5 font-weight-regular"
                        >
                          Dirty Mind
                        </v-list-item-title>
                        <v-list-item-subtitle>You owes Senthuran $13</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content class="text-right">
                        <v-list-item-subtitle class="text-h4 green--text">
                          You owed $13
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>

                <v-card to="group_info">
                  <v-card-text>
                    <v-list-item
                      class="grow"
                      two-line
                    >
                      <v-avatar
                        class="mr-2"
                        color="orange"
                        size="62"
                      >
                        <span class="white--text text-h5">D</span>
                      </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          class="text-h5 font-weight-regular"
                        >
                          Dirty Mind
                        </v-list-item-title>
                        <v-list-item-subtitle>You owes Senthuran $13</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content class="text-right">
                        <v-list-item-subtitle class="text-h4 green--text">
                          You owed $13
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    //
  }
</script>
