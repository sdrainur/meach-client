<template>
  <v-app>
    <v-layout>
      <navigation-vuetify></navigation-vuetify>
      <v-main class="pa-4">
        <!--        <v-expansion-panels variant="popout" class="my-4">-->
        <!--          <v-expansion-panel-->
        <!--              color="element"-->
        <!--              title="Все пользователи"-->
        <!--          >-->
        <!--            <v-expansion-panel-text>-->

        <!--            </v-expansion-panel-text>-->
        <!--          </v-expansion-panel>-->
        <!--        </v-expansion-panels>-->
        <v-container class="title">
          <v-expansion-panels variant="inset" class="my-4">
            <v-expansion-panel
                title="Все пользователи"
                @click="openAllUsers"
            >
              <!--              <v-responsive>-->
              <v-expansion-panel-text style="overflow: auto; max-height: 60ch">
                <v-list>
                  <v-list-item v-for="user in users" prepend-icon="mdi-account"
                               :title="user.firstName+' '+user.secondName" value="myfiles"
                               @click="openUser(user); this.dialog=true"></v-list-item>
                </v-list>
              </v-expansion-panel-text>
              <!--              </v-responsive>-->
            </v-expansion-panel>
            <v-expansion-panel
                title="Полученные заявки"
                @click="openReceivedRequests"
            >
              <v-expansion-panel-text style="overflow: auto; max-height: 60ch">
                <v-list>
                  <v-list-item v-if="users.length===0" prepend-icon="mdi-warning"
                               title="Нет полученных заявок"></v-list-item>
                  <v-list-item v-for="user in users" prepend-icon="mdi-account"
                               :title="user.firstName+' '+user.secondName" value="myfiles"
                               @click="openUser(user); this.dialogReceivedRequests=true"></v-list-item>
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
                  <v-list-item v-for="user in users" prepend-icon="mdi-account"
                               :title="user.firstName+' '+user.secondName" value="myfiles"></v-list-item>
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
                  <v-list-item v-for="user in users" prepend-icon="mdi-account"
                               :title="user.firstName+' '+user.secondName" value="myfiles"
                               @click="openUser(user); dialogFriend=true"></v-list-item>
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
                  <v-card-text>Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
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
                        @click="sendRequest(openedUser.login)"
                    >
                      Добавить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-dialog>
            <v-dialog
                v-model="dialogReceivedRequests"
                parent
            >
              <v-container style="max-width: 50vh">
                <v-card>
                  <v-card-title class="text-h5 align-center">
                    {{ openedUser.firstName + ' ' + openedUser.secondName }}
                  </v-card-title>
                  <v-card-text>Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
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
                        @click="acceptRequest(openedUser.login)"
                    >
                      Принять
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-dialog>
            <v-dialog
                v-model="dialogFriend"
                parent
            >
              <v-container style="max-width: 50vh">
                <v-card>
                  <v-card-title class="text-h5 align-center">
                    {{ openedUser.firstName + ' ' + openedUser.secondName }}
                  </v-card-title>
                  <v-card-text>Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialogFriend = false"
                    >
                      Закрыть
                    </v-btn>
                    <v-btn
                        color="red-darken-1"
                        variant="text"
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
import NavigationVuetify from "@/components/navigation-vuetify";
import axios from "axios";
import LoginForm from "@/components/login-form";
import {useToast} from "vue-toastification";

export default {
  name: "users-vuetify",
  components: {LoginForm, NavigationVuetify},
  data() {
    return {
      openedUser: null,
      users: null,
      dialog: false,
      dialogReceivedRequests: false,
      dialogFriend: false,
      dialogDeleteFriend: false
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
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
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap');

.title {
  font-family: 'Raleway', sans-serif;
}
</style>