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
                to="/create-group"
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
                        class="text-h2 font-weight-regular white--text center"
                      >
                        Groups
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
                <template v-for="(item, index) in groups">
                  <single-gorup-card :key="index+1" :groupName="item.groupName" :isOwner="item.isOwner" :groupId="item.groupId"/>
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
