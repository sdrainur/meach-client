<template>
  <div class="app">
    <div class="sticky-top">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Meach</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="modal" data-bs-target="#profileModal" @click="openInfo">Профиль</a>
              </li>
              <!--              <li class="nav-item">-->
              <!--                <a class="nav-link" href="/user">Домашняя</a>-->
              <!--              </li>-->
              <li class="nav-item">
                <a class="nav-link" href="/messenger">Сообщения</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/users">Пользователи</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="" @click="logout">Выход</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <h5>
              {{ authUser.firstName + ' ' + authUser.secondName }}
            </h5>
            <hr/>
            <h6>
            </h6>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {authentication} from "@/store/authentication.module";
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      authUser: {
        firstName: null,
        secondName: null,
        city: null,
        login: null
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.authentication.user
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    }
  },
  methods: {
    logout() {
      const {dispatch} = this.$store;
      dispatch('authentication/logout');
    },
    openInfo() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/" + this.$store.getters['authentication/getAuthenticatedLogin'], requestOptions)
          .then(response => {
            this.authUser = response.data
            console.log(this.authUser.firstName)
          })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.modal-body{
  text-align: center;
}
</style>