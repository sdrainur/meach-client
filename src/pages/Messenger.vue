<template>
  <Navbar></Navbar>
  <br/>
  <div class="container shadow p-3 mb-5 bg-white rounded">
<!--    <div class="card mt-4">-->
      <div class="row g-0">
        <div class="col-12 col-lg-5 col-xl-3 border-right">
          <div class="px-4 d-none d-md-block">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <input type="text" class="form-control my-3" placeholder="Search...">
              </div>
            </div>
          </div>
          <div>
<!--            <a href="#" class="list-group-item list-group-item-action border-0" v-if="isOpened"-->
<!--               @click="closeMessages">-->
<!--              <div class="badge bg-success float-right">5</div>-->
<!--              <div class="d-flex align-items-start">-->
<!--                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1"-->
<!--                     alt="Vanessa Tucker"-->
<!--                     width="40" height="40">-->
<!--                <div class="flex-grow-1 ml-3">-->
<!--                  {{ loggedInu.firstName + " " + loggedInLogin.secondName }}-->
<!--                  <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </a>-->
          </div>
          <div v-for="user in users">
            <div v-if="user.login !== loggedInLogin">
              <a href="#" class="list-group-item list-group-item-action border-0" v-if="isOpened"
                 @click="closeMessages">
                <div class="badge bg-success float-right">5</div>
                <div class="d-flex align-items-start">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1"
                       alt="Vanessa Tucker"
                       width="40" height="40">
                  <div class="flex-grow-1 ml-3">
                    {{ user.firstName + " " + user.secondName }}
                    <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item list-group-item-action border-0" v-if="!isOpened"
                 @click="openMessages(user)">
                <div class="badge bg-success float-right">5</div>
                <div class="d-flex align-items-start">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1"
                       alt="Vanessa Tucker"
                       width="40" height="40">
                  <div class="flex-grow-1 ml-3">
                    {{ user.firstName + " " + user.secondName }}
                    <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <hr class="d-block d-lg-none mt-1 mb-0">
        </div>
        <div class="col-12 col-lg-7 col-xl-9" v-if="isOpened">
          <div class="py-2 px-4 border-bottom d-none d-lg-block">
            <div class="d-flex align-items-center py-1">
              <div class="position-relative">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1"
                     alt="Sharon Lessman" width="40" height="40">
              </div>
              <div class="flex-grow-1 pl-3">
                <strong>{{ openedUser.firstName + ' ' + openedUser.secondName }}</strong>
                <!--                <div class="text-muted small"><em>Typing...</em></div>-->
              </div>
              <div>
                <button class="btn btn-primary btn-lg mr-1 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="feather feather-phone feather-lg">
                    <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
                <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="feather feather-video feather-lg">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </button>
                <button class="btn btn-light border btn-lg px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="feather feather-more-horizontal feather-lg">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="position-relative">
            <div class="flex-grow-0 py-3 px-4 border-top">
              <div class="input-group">
                <!--              <form @submit.prevent="postMessage" class="form-control-plaintext">-->
                <!--                <input ref="messageInput" type="text" id="message-input" class="form-control"-->
                <!--                       placeholder="Type your message"-->
                <!--                       @input="newMessage.text=$event.target.value">-->
                <!--                <button id="message-send-button" class="btn btn-primary" @click="postMessage">Send</button>-->
                <!--              </form>-->
                <form class="input-group mb-3" @submit.prevent="postMessage">
                  <input type="text" class="form-control" placeholder="Введите сообщение..."
                         aria-label="Recipient's username" aria-describedby="button-addon2"
                         @input="newMessage.text=$event.target.value"
                         ref="messageInput">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="createToast">Отправить</button>
                </form>
              </div>
            </div>
            <div ref="messages" id="messages" class="chat-messages p-4">
              <div v-for="message in messages">
                <div class="chat-message-right pb-4" v-if="message.senderLogin===loggedInLogin">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1"
                         alt="Chris Wood" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2">{{ message.messageDateTime }}</div>
                  </div>
                  <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">You</div>
                    {{ message.text }}
                  </div>
                </div>

                <div class="chat-message-left pb-4" v-if="message.senderLogin!==loggedInLogin">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1"
                         alt="Sharon Lessman" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2">{{ message.messageDateTime }}</div>
                  </div>
                  <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div class="font-weight-bold mb-1">{{
                        openedUser.firstName + ' ' + openedUser.secondName
                      }}
                    </div>
                    {{ message.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--          <div class="flex-grow-0 py-3 px-4 border-top">-->
          <!--            <div class="input-group">-->
          <!--&lt;!&ndash;              <form @submit.prevent="postMessage" class="form-control-plaintext">&ndash;&gt;-->
          <!--&lt;!&ndash;                <input ref="messageInput" type="text" id="message-input" class="form-control"&ndash;&gt;-->
          <!--&lt;!&ndash;                       placeholder="Type your message"&ndash;&gt;-->
          <!--&lt;!&ndash;                       @input="newMessage.text=$event.target.value">&ndash;&gt;-->
          <!--&lt;!&ndash;                <button id="message-send-button" class="btn btn-primary" @click="postMessage">Send</button>&ndash;&gt;-->
          <!--&lt;!&ndash;              </form>&ndash;&gt;-->
          <!--              <form class="input-group mb-3" @submit.prevent="postMessage">-->
          <!--                <input type="text" class="form-control" placeholder="Введите сообщение..."-->
          <!--                       aria-label="Recipient's username" aria-describedby="button-addon2"-->
          <!--                       @input="newMessage.text=$event.target.value"-->
          <!--                       ref="messageInput">-->
          <!--                <button class="btn btn-outline-secondary" type="button" id="button-addon2"  >Отправить</button>-->
          <!--              </form>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
<!--    <div class="alert alert-danger d-flex align-items-center overlay" role="alert">-->
<!--      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>-->
<!--      <div>-->
<!--        An example danger alert with an icon-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
import {addHandler, connectChat, sendMessage} from "@/ws/wsChat";
import { useToast } from 'vue-toastification'

export default {
  name: "Messenger",
  components: {Navbar},
  data() {
    return {
      warning: false,
      loggedInLogin: null,
      loggenInUser:null,
      sender: null,
      users: null,
      isOpened: false,
      openedUser: null,
      messages: null,
      newMessage: {
        text: null,
        sender: null,
        receiver: null
      }
    }
  },
  setup() {

    const toast = useToast();

    return { toast }
  },
  mounted() {
    // this.scrollToElement()
    connectChat()
    addHandler(data => {
      this.messages.push(data)
    })
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    }
    this.loggedInLogin = this.$store.getters['authentication/getAuthenticatedLogin']
    // axios.all([
    //   axios
    //       .get("http://localhost:9000/user/users", requestOptions),
    //   axios
    //       .get("http://localhost:9000/user", requestOptions)
    // ]).then(([
    //     users,
    //     sender
    // ])=>{
    //   this.sender = sender.data
    //   this.users = users.data
    // })
    // axios.all([
    //   axios
    //       .get("http://localhost:9000/user/users", requestOptions),
    //   axios
    //       .get("http://localhost:9000/user/users", requestOptions)
    // ]).then(([]))
    axios
        .get("http://localhost:9000/user/users", requestOptions)
        .then(response => {
          this.users = response.data
          console.log(response.data)
        }).catch(error => {
      if (error.code === 'ERR_BAD_REQUEST') {
        this.$store.dispatch('authentication/getAccessTokenForRefresh');
      }
    });
  },
  methods: {
    createToast() {
      this.toast.error("Ты даун", {
        timeout: 5000
      });
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
            document.title = this.messages
          }).catch(error => {
        if (error.code === 'ERR_BAD_REQUEST') {
          this.$store.dispatch('authentication/getAccessTokenForRefresh');
        }
      });
      let element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight
    },
    closeMessages() {
      this.isOpened = false
      this.messages = null
    },
    postMessage() {
      if(this.newMessage.text!==null) {
        sendMessage({
          text: this.newMessage.text,
          senderLogin: this.loggedInLogin,
          receiverLogin: this.openedUser.login
        })
        this.$refs.messageInput.value = ""
      }
    }
  }
}
</script>

<style scoped>
body {
  margin-top: 0px;
}

.chat-online {
  color: #34ce57
}

.chat-offline {
  color: #e4606d
}

.chat-messages {
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: scroll
}

.chat-message-left,
.chat-message-right {
  display: flex;
  flex-shrink: 0
}

.chat-message-left {
  margin-right: auto
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto
}

.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.flex-grow-0 {
  flex-grow: 0 !important;
}

.border-top {
  border-top: 1px solid #dee2e6 !important;
}

.overlay{
  position: absolute;
  top: 40ch;
  left: 60ch;
  z-index: 90000;
}
</style>