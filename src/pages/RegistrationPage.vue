<template>
  <Navbar></Navbar>
  <br/>

  <div class="container">
    <h1 class="h-100 d-flex align-items-center justify-content-center">
      Регистрация
    </h1>
    <br/>
    <form class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Эл. адрес</label>
        <input type="email" class="form-control" placeholder="example@example.ru"
               @input="user.email = $event.target.value">
      </div>
      <div class="col-md-6">
        <label class="form-label">Логин</label>
        <input type="text" class="form-control" @input="user.login = $event.target.value">
      </div>
      <div class="col-md-12">
        <label class="form-label">Пароль</label>
        <input type="password" class="form-control" @input="user.password = $event.target.value">
      </div>
      <div class="col-12">
        <label class="form-label">Имя</label>
        <input type="text" class="form-control" placeholder="Иван" @input="user.firstName = $event.target.value">
      </div>
      <div class="col-12">
        <label class="form-label">Фамилия</label>
        <input type="text" class="form-control" placeholder="Иванов" @input="user.secondName = $event.target.value">
      </div>
      <div class="col-md-12">
        <label class="form-label">Город</label>
        <input type="text" class="form-control" placeholder="Казань" @input="user.city = $event.target.value">
      </div>
<!--      <div class="overflow-auto">-->
<!--        <div class="form-check">-->
<!--          <div v-for="cathegory in cathegories">-->
<!--            <input class="form-check-input" type="checkbox" v-bind:value="cathegory.id"-->
<!--                   v-model="user.selectedCathegories">-->
<!--            <label class="form-check-label">{{ cathegory.name }}</label><br>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="col-12">
        <button type="submit" class="btn btn-primary" @click="signUp">Зарегистрироваться</button>
      </div>
    </form>
  </div>

</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router/router";
import axios from "axios";

export default {
  name: "RegistrationPage",
  components: {Navbar},
  data() {
    return {
      user: {
        email: null,
        login: null,
        password: null,
        firstName: null,
        secondName: null,
        city: null
      }
    }
  },
  mounted() {
  },
  methods: {
    signUp() {
      console.log(this.userInfo)
      console.log(this.user)

      fetch('http://localhost:9000/signup', {
        method: 'post',
        body: JSON.stringify({
          email: this.user.email,
          login: this.user.login,
          password: this.user.password,
          firstName: this.user.firstName,
          secondName: this.user.secondName,
          city: this.user.city
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      router.push('/signup/activate')
    },
  }
}

</script>

<style scoped>

</style>