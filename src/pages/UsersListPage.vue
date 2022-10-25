<template>
  <Navbar></Navbar>
  <br/>
  <div class="container">
    <div v-for="user in users">
      <div class="card" @click="openUser(user.login)">
        <div class="card-body">
          <h5 class="card-title">{{ user.firstName + ' ' + user.secondName }}</h5>
          <a href="#" class="btn btn-primary">Добавить</a>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";

export default {
  name: "UsersListPage",
  components: {Navbar},
  data() {
    return {
      users: null
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
        .get("http://localhost:9000/user/users", requestOptions)
        .then(response => {
          this.users = response.data
        })
  },
  methods: {
    openUser(login){
      this.$router.push('/user/'+login)
    }
  }
}
</script>

<style scoped>

</style>