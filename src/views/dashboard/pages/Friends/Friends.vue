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
                  Friends
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
                    to="search_friends"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <base-single-person-card />
          <base-single-person-card />
          <base-single-person-card />
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
                  Requested Friends
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <base-single-person-card />
          <base-single-person-card />
          <base-single-person-card />
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
