<template xmlns="http://www.w3.org/1999/html">
  <navbar/>
  <br/>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ user.firstName + ' ' + user.secondName }}</h5>
            <p class="card-text">Специалист по HTML, CSS, JavaScript.</p>
            <p class="card-text"><small class="text-muted">Был онлайн 3 мин. назад</small></p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">29 лет</li>
            <li class="list-group-item">{{ user.city }}</li>
            <li class="list-group-item">Всегда готов помочь вам в обучении!</li>
          </ul>
          <ul class="list-group list-group-flush">
            <div class="card-body">
              <form :action="'/chat/'+user.login">
                <button type="submit" class="btn btn-outline-primary">Отправить сообщение
                </button>
              </form>
            </div>
          </ul>
          <ul class="list-group list-group-flush">
            <div class="card-body">
              <button type="button" class="btn btn-outline-primary" @click="sendRequest(user.login)">Добавить в контакты
              </button>
            </div>
          </ul>
        </div>
      </div>
      <div class="col-8">
        <div class="card mb-3">
          <div class="card-body">
            <h5>Новая статья</h5>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Заголовок</label>
              <input type="email" class="form-control" id="exampleFormControlInput1"
                     @input="newPost.topic=$event.target.value">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Содержание</label>
              <input class="form-control" id="exampleFormControlTextarea1" rows="3"
                     @input="newPost.content=$event.target.value">
            </div>
            <button class="btn btn-outline-primary" @click="postArticle">
              Опубликовать
            </button>
          </div>

        </div>
        <div v-for="post in posts">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ post.topic }}</h5>
              <p class="card-text">{{ post.content }}</p>
              <p class="card-text"><small class="text-muted">{{ post.postTime }}</small></p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
  <br/>

  <div class="mt-auto">
    <footer id=" footer" class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
      </ul>
      <p class="text-center text-muted">© 2021 Company, Inc</p>
    </footer>
  </div>

</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import Navbar from "@/components/Navbar";
import {addHandler, sendArticle} from "@/util/ws";
import {connect} from "@/util/ws";
import {useToast} from "vue-toastification";

export default {
  components: {Navbar},
  data() {
    return {
      user: {
        login: null,
        firstName: null,
        secondName: null,
        city: null
      },
      posts: null,
      senderLogin: null,
      newPost: {
        user: null,
        topic: null,
        content: null,
        postTime: null
      }
    }
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  created() {
    connect()
    addHandler(data => {
      this.posts.push(data)
    })
  },
  mounted() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    };
    // axios
    //     .get('http://localhost:9000/posts/getall', requestOptions)
    //     .then(response =>{
    //       console.log(response.data);
    //     })
    axios
        .get('http://localhost:9000' + this.$route.path, requestOptions)
        .then(user => {
              console.log(user.data)
              this.user = user.data;
              this.posts = postResponse.data;
            }
        ).catch(error => {
      if (error.code === 'ERR_BAD_REQUEST') {
        this.$store.dispatch('authentication/getAccessTokenForRefresh');
      }
    });
  },
  methods: {
    postArticle() {
      this.newPost.user = this.user
      // const requestOptions = {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      //   },
      //   body: JSON.stringify({
      //     topic: this.newPost.topic,
      //     content: this.newPost.content
      //   })
      // };
      // fetch("http://localhost:9000/posts/addPost", requestOptions);
      sendArticle(this.newPost)
    },
    deleteArticle() {
      axios
          .delete("http://localhost:9000/posts/deleteArticle",)
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

<style>

</style>