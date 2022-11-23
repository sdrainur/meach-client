<template>
  <v-navigation-drawer
      expand-on-hover
      rail
      elevation="10"
  >
    <v-list>
      <v-list-item
          prepend-icon="mdi-account-circle"
          v-bind:title="authUser.firstName+' '+authUser.secondName"
          v-bind:subtitle="'@'+authUser.login"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>


      <v-list-item prepend-icon="mdi-account" title="Профиль" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-mail" title="Сообщения" value="shared" href="/main"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Пользователи" value="starred" href="/users-vuetify"></v-list-item>
      <v-list-item prepend-icon="mdi-logout" title="Выход" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "navigation-vuetify",
  data() {
    return {
      authUser: {
        firstName: null,
        secondName: null,
        city: null,
        login: null
      },
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
    axios
        .get("http://localhost:9000/user/" + this.$store.getters['authentication/getAuthenticatedLogin'], requestOptions)
        .then((response) => {
          this.authUser = response.data
        })
  },
  methods:{
    logout() {
      const {dispatch} = this.$store;
      dispatch('authentication/logout');
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>

</style>