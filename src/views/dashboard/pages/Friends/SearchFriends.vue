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
        <v-card>
          <v-card-text>
            <v-text-field
              append-icon="mdi-account-search"
              name="input-10-1"
              label="Person Name"
            />
            <v-card color="blue">
              <v-card-text class="white--text">
                Invite Friend
              </v-card-text>
            </v-card>
            <base-single-person-card />
            <base-single-person-card />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="orange"
        >
          <template v-slot:heading>
            <span
              class="text-h3 font-weight-bold"
            >
              Invite
            </span>
          </template>
          <form>
            <v-text-field
              label="Email"
              required
            />
            <v-text-field
              label="Group Name"
              disabled="true"
            />
            <span
              class="font-weight-bold text-h4"
            >This link will be expired after: </span>
            <span>
              28th Sept 2021
            </span>
            <v-btn
              class="blue--text ma-0 pa-0"
              color="transparent"
              elevation="0"
            >
              Select another Expiry date
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
