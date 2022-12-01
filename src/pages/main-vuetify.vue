<template>
  <v-app>
    <v-layout>
      <navigation-vuetify></navigation-vuetify>
      <v-navigation-drawer
          expand-on-hover
          location="right"
          elevation="10"
      >
        <template v-slot:prepend>
          <v-container>
            <p class="friends-text">Друзья</p>
          </v-container>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item v-if="users===null">
            <p class="font-raleway">Список пуст. Добавьте друзей во вкладке "Пользователи".</p>
          </v-list-item>
          <v-list-item v-for="user in users" @click="openMessages(user)">
            <p class="friend-text">{{ user.firstName + ' ' + user.secondName }}</p>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <!--        <v-app-bar color="element" :elevation="2" title="Meach"></v-app-bar>-->
        <v-container class="full-height">
          <v-container class="fill-height">
            <v-row justify="center" align="center" class="mb-3 title-text">
              <h1>Сообщения</h1>
            </v-row>
            <v-card variant="tonal" :elevation="10">
              <v-card-item>
                <v-container id="messages-box" style="overflow: auto; max-height: 70vh; min-height: 70vh;" class="mb-3">
                  <v-row
                      class="fill-height pa-2"
                      align="end">
                    <v-col>
                      <v-row v-if="messages===null" align="center" justify="center">
                        <h5 class="font-raleway">Откройте диалог, выбрав собеседника в правом боковом окне.</h5>
                      </v-row>
                      <div v-for="message in messages"
                           :class="['d-flex flex-row align-center my-2', message.senderLogin === authUser.login ? 'justify-end': null]">
                        <v-row
                            :class="['d-flex flex-row align-center my-2', message.senderLogin === authUser.login ? 'justify-end': null]">
                          <v-timeline class="mr-3" v-if="message.senderLogin !== authUser.login">{{
                              message.messageDateTime
                            }}
                          </v-timeline>
                          <span v-if="message.senderLogin === authUser.login" class="blue--text mr-3">{{
                              message.text
                            }}</span>
                          <v-avatar :color="message.senderLogin === authUser.login ? 'indigo': 'red'" size="36">
                            <span class="white--text">{{ message.senderLogin.charAt(0) }}</span>
                          </v-avatar>
                          <span v-if="message.senderLogin !== authUser.login" class="blue--text ml-3">{{
                              message.text
                            }}</span>
                          <v-timeline class="ml-3" v-if="message.senderLogin === authUser.login">{{
                              message.messageDateTime
                            }}
                          </v-timeline>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <!--              </v-card-item>-->
                <!--              <v-card-item style="max-height: 10ch">-->
                <v-container class="pa-1">
                  <v-row>
                    <v-col>
                      <v-text-field
                          ref="messageInput"
                          label="Сообщение"
                          @input="newMessage.text=$event.target.value"
                          @submit.prevent="postMessage"
                          @keyup.enter="postMessage">
                      </v-text-field>
                    </v-col>
                    <v-col style="max-height: 7ch; max-width: 10ch">
                      <v-btn value="Отправить" @click="postMessage" style="width: 10ch; height: 7ch">
                        <v-icon>mdi-send</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-item>
            </v-card>
          </v-container>
        </v-container>
        <!--        <v-bottom-navigation-->
        <!--            elevation="10"-->
        <!--            class="ma-5"-->
        <!--        >-->
        <!--          <v-text-field-->
        <!--              label="Сообщение"-->
        <!--              @input="newMessage.text=$event.target.value"-->
        <!--              @submit.prevent="postMessage"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--          <v-btn value="Отправить" @click="postMessage">-->
        <!--            <v-icon>mdi-send</v-icon>-->
        <!--          </v-btn>-->
        <!--        </v-bottom-navigation>-->
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import NavigationBarVuetify from "@/components/navigation-bar-vuetify";
import MessengerVuetify from "@/components/messenger-vuetify";
import NavigationVuetify from "@/components/navigation-vuetify";
import axios from "axios";
import Friends from "@/components/friends";
import {addHandler, connectChat, sendMessage} from "@/ws/wsChat";

export default {
  name: "main-vuetify",
  components: {Friends, NavigationVuetify, MessengerVuetify, NavigationBarVuetify},
  data() {
    return {
      authUser: {
        firstName: null,
        secondName: null,
        city: null,
        login: null
      },
      users: null,
      messages: null,
      openedUser: null,
      isOpened: false,
      loggedInLogin: null,
      newMessage: {
        text: null,
        sender: null,
        receiver: null
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
      this.$router.push('login')
    },
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
      this.openedUser = user
      axios
          .get('http://localhost:9000/getMessages/' + user.login, requestOptions)
          .then(messages => {
            console.log(messages.data)
            this.messages = messages.data
            this.$nextTick(() => {
              var objDiv = document.getElementById("messages-box");
              console.log(objDiv.scrollHeight);
              objDiv.scrollTop = objDiv.scrollHeight;
            });
          }).catch(error => {
        if (error.code === 'ERR_BAD_REQUEST') {
          this.$store.dispatch('authentication/getAccessTokenForRefresh');
        }
      })
    },
    postMessage() {
      if (this.newMessage.text !== null) {
        sendMessage({
          text: this.newMessage.text,
          senderLogin: this.loggedInLogin,
          receiverLogin: this.openedUser.login
        })
        console.log(this.$refs.messageInput)
        this.$refs.messageInput.reset()
      }
    }
  },
  created() {
    document.title = 'Сообщения'
    this.$watch('messages', function () {
      this.$nextTick(() => {
        var objDiv = document.getElementById("messages-box");
        console.log(objDiv.scrollHeight);
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }, {deep: true})
    connectChat()
    addHandler(data => {
      this.messages.push(data)
    })
    this.loggedInLogin = this.$store.getters['authentication/getAuthenticatedLogin']
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    }
    axios.all([
      axios
          .get("http://localhost:9000/user/" + this.$store.getters['authentication/getAuthenticatedLogin'], requestOptions),
      axios
          .get("http://localhost:9000/user/get-friends", requestOptions)
    ]).then((response) => {
      this.authUser = response[0].data
      this.users = response[1].data
    })
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap);

.title-text {
  font-family: 'Raleway', sans-serif;
  font-size: 4ch;
}

.font-raleway{
  font-family: 'Raleway', sans-serif;
}

.friends-text {
  font-family: 'Raleway', sans-serif;
  font-size: 4ch;
}

.friend-text {
  font-family: 'Raleway', sans-serif;
  font-size: 2ch;
}

.chat {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>