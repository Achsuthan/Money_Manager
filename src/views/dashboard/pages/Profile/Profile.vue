<template>
  <v-container fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card color="orange">
          <template v-slot:heading>
            <v-list-item class="grow ma-0 ma-0" two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-regular">
                  Profile
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-card elevation="2">
            <v-card-text class="grow pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap"
                  >
                    <br />
                    Name : <span style="color: black"> {{ name }} </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="text-h4 font-weight-regular text-wrap"
                  >
                    <br />
                    Email : <span style="color: black"> {{ email }} </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="error" @click="logout()"> Logout </v-btn>
              </v-list-item>
            </v-card-text>
          </v-card>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: String,
    email: String,
  }),
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.name = user.name;
    this.email = user.email;
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
};
</script>
