<template>
  <v-app>
    <v-layout>
      <navigation-vuetify></navigation-vuetify>
      <v-main>
        <v-container class="title mt-4" style="max-width: 90vw">
          <v-row align="center" justify="center">
            <h1>Пользователи</h1>
          </v-row>
          <v-expansion-panels variant="inset" class="my-4">
            <v-expansion-panel
                title="Все пользователи"
                @click="openAllUsers"
            >
              <v-expansion-panel-text style="overflow: auto; max-height: 60ch">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                          v-model="searchValue"
                          ref="messageInput"
                          :label="'Введите ' + select.state.toLowerCase()"
                          @submit.prevent="searchUsers"
                          @keyup.enter="searchUsers">
                      </v-text-field>
                    </v-col>
                    <v-col style="max-height: 7ch; max-width: 10ch">
                      <v-btn @click="searchUsers" style="width: 10ch; height: 7ch">
                        <v-icon>mdi-account-search</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-select
                        v-model="select"
                        :items="items"
                        item-title="state"
                        item-value="abbr"
                        label="Select"
                        hint="Выберите тип поиска"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                  </v-row>
                </v-container>
                <!--                <v-list-item v-if="users.length<=1" prepend-icon="mdi-warning"-->
                <!--                             title="Нет пользователей"></v-list-item>-->
                <v-list>
                  <div v-for="user in users">
                    <v-list-item v-if="user.login!==authLogin" prepend-icon="mdi-account"
                                 :title="user.firstName+' ' + user.secondName" value="myfiles"
                                 @click="checkFriend(user); openUser(user); this.dialog=true; this.dialogType=1"></v-list-item>
                  </div>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                title="Полученные заявки"
                @click="openReceivedRequests"
            >
              <v-expansion-panel-text style="overflow: auto; max-height: 60ch">
                <v-list>
                  <v-list-item v-if="users[0]===null" prepend-icon="mdi-warning"
                               title="Нет полученных заявок"></v-list-item>
                  <div v-for="user in users">
                    <v-list-item v-if="user.login!==authLogin" prepend-icon="mdi-account"
                                 :title="user.firstName+' '+user.secondName" value="myfiles"
                                 @click="openUser(user); this.dialog=true; this.dialogType=2"></v-list-item>
                  </div>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                title="Отправленные заявки"
                @click="openSentRequests"
            >
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item v-if="users.length===0" prepend-icon="mdi-warning"
                               title="Нет отправленных заявок"></v-list-item>
                  <div v-for="user in users">
                    <v-list-item v-if="user.login!==authLogin" prepend-icon="mdi-account"
                                 :title="user.firstName+' '+user.secondName"
                                 value="myfiles"></v-list-item>
                  </div>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                title="Друзья"
                @click="getFriends"
            >
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item v-if="users.length===0" prepend-icon="mdi-warning"
                               title="Нет пользователей"></v-list-item>
                  <div v-for="user in users">
                    <v-list-item v-if="user.login!==authLogin" prepend-icon="mdi-account"
                                 :title="user.firstName+' '+user.secondName" value="myfiles"
                                 @click="openUser(user); this.dialog=true; this.dialogType=3"></v-list-item>
                  </div>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row justify="center">
            <v-dialog
                v-model="dialog"
                parent
            >
              <v-container style="max-width: 50vh">
                <v-card>
                  <v-card-title class="text-h5 align-center">
                    {{ openedUser.firstName + ' ' + openedUser.secondName }}
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <p>
                          @{{ openedUser.login }}
                        </p>
                      </v-row>
                      <v-row>
                        <p>{{ openedUser.description }}</p>
                      </v-row>
                    </v-container>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                      Закрыть
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        v-if="dialogType===1"
                        @click="sendRequest(openedUser.login)"
                    >
                      Добавить
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        v-if="dialogType===2"
                        @click="acceptRequest(openedUser.login)"
                    >
                      Добавить
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        v-if="dialogType===3"
                        @click="dialogDeleteFriend=true"
                    >
                      Удалить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-dialog>
            <v-dialog
                v-model="dialogDeleteFriend"
                persistent
            >
              <v-card>
                <v-card-title class="text-h5">
                  Удалить пользователя из друзей?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="green-darken-1"
                      variant="text"
                      @click="dialogDeleteFriend = false"
                  >
                    Нет
                  </v-btn>
                  <v-btn
                      color="green-darken-1"
                      variant="text"
                      @click="deleteFriend(openedUser); dialogDeleteFriend=false"
                  >
                    Да
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import NavigationVuetify from "@/components/Navigation";
import axios from "axios";
import LoginForm from "@/components/LoginForm";
import {useToast} from "vue-toastification";

export default {
  name: "users-vuetify",
  components: {NavigationVuetify},
  data() {
    return {
      authLogin: null,
      openedUser: null,
      users: null,
      dialog: false,
      dialogType: null,
      dialogDeleteFriend: false,
      searchValue: null,
      select: {state: 'Имя'},
      items: [
        {state: 'Имя'},
        {state: 'Логин'},
        {state: 'Описание'},
      ],
      isFriend: false
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  mounted() {
    document.title = 'Пользователи'
    this.authLogin = this.$store.getters['authentication/getAuthenticatedLogin']
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
      fetch('http://localhost:9000/user/send-request/' + login, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        }
      })
      this.toast.success("Заявка на добавление отправлена!", {
        timeout: 5000
      })
    },
    deleteFriend(user) {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      fetch('http://localhost:9000/user/delete-friend/' + user.login, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        }
      }).then(response => {
        this.users = response.data
        this.toast.success("Пользователь удален!", {
          timeout: 5000
        })
      })
    },
    openReadyUsers() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .get("http://localhost:9000/user/get-ready-to-meet-users", requestOptions)
          .then(request => {
            this.users = request.data
          })
      this.selectedGroup = 5
    },
    searchUsers() {
      if (this.searchValue === '') {
        this.openAllUsers()
      } else {
        const requestOptions = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
          },
        }
        let type
        if (this.select.state === 'Имя') type = 'name'
        if (this.select.state === 'Логин') type = 'login'
        if (this.select.state === 'Описание') type = 'description'
        axios
            .get("http://localhost:9000/user/get-by-substring/" + type + '/' + this.searchValue, requestOptions)
            .then(request => {
              if (request.data.length === 0) {
                this.toast.warning("Пользователи по запросу не найдены")
              } else {
                this.users = request.data
              }
            })
      }
    },
    checkFriend(user) {
      this.getFriends()
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
            if (request.data.some(elem => {
              return JSON.stringify(user) === JSON.stringify(elem)
            })) {
              this.isFriend = true
              this.dialogType=3
            } else {
              this.isFriend = false
            }
          })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap');

.title {
  /*font-family: 'Raleway', sans-serif;*/
}
</style>