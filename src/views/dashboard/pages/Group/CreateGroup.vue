<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-col cols="12" md="12">
          <base-material-card color="orange">
            <template v-slot:heading>
              <span class="text-h3 font-weight-bold"> Create Group </span>
            </template>
            <v-form ref="form">
              <v-text-field
                label="Group Name"
                v-model="groupName"
                :rules="[nameRule.required]"
              />
              <br />
              <br />
              <v-btn color="red" v-on:click="clear()"> Clear </v-btn>
              <v-btn class="mr-4" color="primary" v-on:click="createGroup()">
                Submit
              </v-btn>
            </v-form>
          </base-material-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SingleGorupCard from "@/components/base/SingleGorupCard.vue";
import GroupService from "@/services/groups";
import AlertHandler from "@/utils/alertHandle";
export default {
  components: { SingleGorupCard },
  data: () => ({
    groupName: "",
    nameRule: {
      required: (value) => !!value || "Please enter group name",
    },
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    createGroup() {
      if (this.$refs.form.validate()) {
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId,
          groupName: this.groupName,
        };
        GroupService.createGroup(payload)
          .then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/group");
            }
          })
          .catch((res) => {
            AlertHandler.errorMessage(res.message);
          });
      }
    },
  },
};
</script>
