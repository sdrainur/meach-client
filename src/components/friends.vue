<template>
  <v-navigation-drawer
      permanent
      location="right"
  >
    <template v-slot:prepend>
      <v-list-item
          lines="two"
          title="Друзья"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="user in users" v-bind:title="user.firstName+' '+user.secondName" @click="openMessages(user)"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "friends",
  data() {
    return {
      users: null,
      messages:null,
      openedUser:null,
      isOpened:false,
    }
  },
  mounted() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    }
    this.loggedInLogin = this.$store.getters['authentication/getAuthenticatedLogin']
    axios
        .get("http://localhost:9000/user/get-friends", requestOptions)
        .then(response => {
          this.users = response.data
          console.log(this.users)
          if(this.users.length===0){
            this.isAlone=true;
          }
          console.log(response.data)
        }).catch(error => {
      if (error.code === 'ERR_BAD_REQUEST') {
        this.$store.dispatch('authentication/getAccessTokenForRefresh');
      }
    });
  },
  methods: {
    openMessages(user) {
      this.openedUser = user
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      this.isOpened = true
      axios
          .get('http://localhost:9000/getMessages/' + user.login, requestOptions)
          .then(messages => {
            console.log(messages.data)
            this.messages = messages.data
            document.title = this.messages
          }).catch(error => {
        if (error.code === 'ERR_BAD_REQUEST') {
          this.$store.dispatch('authentication/getAccessTokenForRefresh');
        }
      })
      this.$nextTick(()=>{
        var objDiv = document.getElementById("messages");
        console.log(objDiv.scrollHeight);
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>

</style>