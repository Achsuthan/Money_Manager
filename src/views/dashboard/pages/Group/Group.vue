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
                <template v-for="item in groups">
                  <single-gorup-card :key="item.groupId" :groupName="item.groupName" :isOwner="item.isOwner"/>
                </template>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SingleGorupCard from '../../../../components/base/SingleGorupCard.vue';
import GroupService from "../../../../services/groups";
import AlertService from '../../../../utils/alertHandle'
  export default {
  components: { SingleGorupCard },
    data: () => ({
      groups: [],
    }),
    created(){
      this.getAllGroups();
    },
    methods:{
      getAllGroups(){
        const payload = {
          userId: JSON.parse(localStorage.getItem("user")).userId
        }
        GroupService.getAllGroups(payload)
        .then(res =>{
          console.log(res);
          if(res.data.body.group){
            this.groups = res.data.body.group;
          }
        })
        .catch(res=>{
          AlertService.errorMessage(res.message)
        })
      }
    }
  }
</script>
