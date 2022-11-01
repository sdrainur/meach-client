<template>
  <Navbar></Navbar>
  <br/>
  <div class="container text-center">
    <div class="row">
      <div class="col-6 col-sm-3">
        <div class="list-group shadow p-3 mb-5 bg-white rounded">
          <button type="button" class="list-group-item list-group-item-action" @click="openAllUsers">
            Все пользователи
          </button>
          <button type="button" class="list-group-item list-group-item-action">Добавленные пользователи</button>
          <button type="button" class="list-group-item list-group-item-action" @click="openSentRequests">Отправленные заявки</button>
          <button type="button" class="list-group-item list-group-item-action" @click="openReceivedRequests">Полученные завки</button>
        </div>
      </div>

      <div class="col-6 col-sm-9 shadow p-3 mb-5 bg-white rounded">
        <div class="container">
          <div class="card text-bg-warning" v-if="users?.length===0">
            <div class="card-header">Нет пользователей</div>
          </div>
          <div v-for="user in users">
            <div class="card " @click="openUser(user.login)">
              <div class="card-body">
                <h5 class="card-title">{{ user.firstName + ' ' + user.secondName }}</h5>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </div>
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
      upHere: false,
      loggedInLogin:null,
      users: null
    }
  },
  mounted() {
    this.loggedInLogin = this.$store.getters['authentication/getAuthenticatedLogin']
    this.openAllUsers()
  },
  methods: {
    openUser(login){
      this.$router.push('/user/'+login)
    },
    openAllUsers(){
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
    openSentRequests(){
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-sent-requests", requestOptions)
          .then(request=>{
            this.users = request.data
          })
    },
    openReceivedRequests(){
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-received-requests", requestOptions)
          .then(request=>{
            this.users = request.data
          })
    }
  }
}
</script>

<style scoped>
.card:hover{
  transition: 0.15s linear;
  color: white;
  background-color: blue;
  cursor: pointer;
}
</style>