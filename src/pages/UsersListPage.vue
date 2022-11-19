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
          <button type="button" class="list-group-item list-group-item-action" @click="getFriends">
            Добавленные пользователи
          </button>
          <button type="button" class="list-group-item list-group-item-action" @click="openSentRequests">
            Отправленные заявки
          </button>
          <button type="button" class="list-group-item list-group-item-action" @click="openReceivedRequests">
            Полученные завки
          </button>
        </div>
      </div>

      <div class="col-6 col-sm-9 shadow p-3 mb-5 bg-white rounded">
        <div class="container">
          <div class="card butt text-bg-warning" v-if="users?.length===0">
            <div class="card-header">Нет пользователей</div>
          </div>
          <div v-for="user in users">
            <div class="row mb-1" v-if="user.login!== loggedInLogin">
              <button class="card col-10" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                      @click="openUser(user)">
                <div class="card-body">
                  <h5 class="card-title">{{ user.firstName + ' ' + user.secondName }}</h5>
                </div>
              </button>
              <div class="card col-2" v-if="selectedGroup===4" @click="acceptRequest(user.login)">
                <div class="card-body">
                  <h5 class="card-title">Принять</h5>
                </div>
              </div>
              <br/>
            </div>
          </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body">
                  <h5>
                    {{ openedUser.firstName + ' ' + openedUser.secondName }}
                  </h5>
                  <h6>
                    {{ openedUser.login }}
                  </h6>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                  <button type="button" class="btn btn-primary" @click="sendRequest(openedUser.login)">Добавить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import {useToast} from "vue-toastification";

export default {
  name: "UsersListPage",
  components: {Navbar},
  data() {
    return {
      openedUser: {
        firstName: null,
        secondName: null,
        login: null
      },
      modalShow: false,
      selectedGroup: 0,
      upHere: false,
      loggedInLogin: null,
      users: null
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  mounted() {
    this.loggedInLogin = this.$store.getters['authentication/getAuthenticatedLogin']
    this.openAllUsers()
  },
  methods: {
    openUser(user) {
      this.openedUser = user
    },
    openAllUsers() {
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
      this.selectedGroup = 1
    },
    openSentRequests() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-sent-requests", requestOptions)
          .then(request => {
            this.users = request.data
          })
      this.selectedGroup = 3
    },
    openReceivedRequests() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-received-requests", requestOptions)
          .then(request => {
            this.users = request.data
          })
      this.selectedGroup = 4
    },
    acceptRequest(login) {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('userToken').accessToken
      // axios
      //     .post("http://localhost:9000/user/accept-request/"+login, requestOptions)
      //     .then(request=>{
      //       console.log(request.data)
      //       this.users = request.data
      //     })
      fetch('http://localhost:9000/user/accept-request/' + login, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        }
      }).then(response => {
        this.users = response.data
        this.toast.success("Пользователь добавлен!", {
          timeout: 5000
        })
      })
    },
    getFriends() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-friends", requestOptions)
          .then(request => {
            this.users = request.data
          })
      this.selectedGroup = 2
    },
    sendRequest(login) {
      fetch('http://localhost:9000/user/send-request/'+login, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        }
      })
      this.toast.success("Заявка на добавление отправлена!", {
        timeout: 5000
      })
    }
  }
}
</script>

<style scoped>

.butt.hover {
  cursor: pointer;
}

</style>