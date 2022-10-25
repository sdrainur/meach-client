<template>
  <navbar></navbar>
  <br/>
  <div class="container text-center">
    <h1>{{ receiver.firstName + ' ' + receiver.secondName }}</h1>
    <div class="card" v-for="message in messages">
      <div class="card-header">
        {{ message.sender.firstName }}
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ message.text }}</p>
          <footer class="modal-footer">{{ message.messageDateTime }}</footer>
        </blockquote>
      </div>
    </div>
    <br/>
    <div class="input-group mb-3">
      <input id="input-message" type="text" class="form-control" placeholder="Введите сообщение..."
             aria-label="Recipient's username"
             aria-describedby="button-addon2" @input="newMessage.text=$event.target.value">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="postMessage">Отправить</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {addHandler, sendMessage} from "@/ws/wsChat";
import axios from "axios";
import {connectChat} from "@/ws/wsChat";

export default {
  name: "Chat",
  components: {Navbar},
  data() {
    return {
      messages: null,
      senderLogin: null,
      receiver: {
        firstName: null,
        secondName: null,
        login: null
      },
      newMessage: {
        text: null,
        senderLogin: null,
        receiverLogin: null
      }
    }
  },
  created() {
    connectChat()
    addHandler(data => {
      this.messages.push(data)
    })
  },
  mounted() {
    // document.querySelector('#input-message').onkeyup = function (e) {
    //   if (e.keyCode === 13) {  // enter, return
    //     document.querySelector('#button-addon2').click()
    //   }
    // }
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    };
    axios.all([
      axios
          .get('http://localhost:9000/user', requestOptions),
      axios
          .get('http://localhost:9000/user/' + this.$route.params.login, requestOptions),
    ]).then(([
               sender,
               receiver,
             ]) => {
          this.sender = sender.data
          this.receiver = receiver.data
          axios
              .get('http://localhost:9000/getMessages/' + this.receiver.login, requestOptions)
              .then(messages => {
                console.log(messages.data)
                this.messages = messages.data
              })
        }
    ).catch(error => {
      if (error.code === 'ERR_BAD_REQUEST') {
        this.$store.dispatch('authentication/getAccessTokenForRefresh');
      }
    })
  },
  methods: {
    postMessage() {
      this.newMessage.receiver = this.receiver
      this.newMessage.sender = this.sender
      sendMessage(this.newMessage)
    }
  }
}
</script>

<style scoped>

</style>