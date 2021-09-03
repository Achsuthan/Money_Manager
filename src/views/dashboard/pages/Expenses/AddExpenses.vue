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
              class="grow pa-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Do you want to settle this balance with?
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
              class="grow pa-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 font-weight-regular"
                >
                  Add Expenses
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <form>
            <v-text-field
              label="Transaction Name"
              required
            />
            <v-textarea
              label="Description"
              required
            />
            <v-select
              label="Transaction To"
              :items="['Friends', 'Group', 'Personal']"
              required
            />
            <v-select
              label="Transaction Type"
              :items="['Expenses','Income','Transfer']"
              required
            />
            <v-select
              label="Category"
              :items="['Category 1','Category 2','Category 3']"
              required
            />
            <v-text-field
              label="Amount"
              required
            />
            <span
              class="font-weight-bold text-h4"
            >Selected Date: </span>
            <span>
              28th Aug 2021
            </span>
            <v-btn
              class="blue--text ma-0 pa-0"
              color="transparent"
              elevation="0"
            >
              Select another Date
            </v-btn>
            <v-row
              justify="start"
              class="pl-4"
            >
              <v-date-picker v-model="picker" />
            </v-row>
            <v-btn
              class="mr-4"
              color="primary"
            >
              submit
            </v-btn>
            <v-btn
              color="red"
            >
              clear
            </v-btn>
          </form>
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
