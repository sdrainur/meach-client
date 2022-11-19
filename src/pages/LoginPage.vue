<template>
<!--  <div>-->
<!--    <div class="alert alert-info">-->
<!--    </div>-->
<!--    <h2>Login</h2>-->
<!--    <form @submit.prevent="handleSubmit">-->
<!--      <div class="form-group">-->
<!--        <label for="username">Username</label>-->
<!--        <input type="text" v-model="login" name="username" class="form-control" :class="{ 'is-invalid': submitted && !login }" />-->
<!--        <div v-show="submitted && !login" class="invalid-feedback">Username is required</div>-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <label htmlFor="password">Password</label>-->
<!--        <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />-->
<!--        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <button class="btn btn-primary" :disabled="loggingIn">Login</button>-->
<!--&lt;!&ndash;        <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />&ndash;&gt;-->
<!--      </div>-->
<!--    </form>-->
<!--  </div>-->

  <Navbar></Navbar>
  <br />
  <div class="container">
    <h1 class="h-100 d-flex align-items-center justify-content-center">
      Вход
    </h1>
    <br/>
    <form class="row g-3">
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Логин</label>
        <input type="text" class="form-control" id="inputEmail4" v-model="login">
        <div v-show="submitted && !login" class="invalid-feedback">Username is required</div>
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="password">
        <div v-show="submitted && !login" class="invalid-feedback">Password is required</div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" :disabled="loggingIn" @click.preventx="handleSubmit">Войти</button>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" :disabled="loggingIn" @click.prevent="signUp">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router/router";
import {useToast} from "vue-toastification";
export default {
  name: "LoginPage",
  components: {Navbar},
  data () {
    return {
      login: '',
      password: '',
      submitted: false
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  computed: {
    loggingIn ()   {
      return this.$store.state.authentication.status.loggingIn;
    }
  },
  created () {
    // reset login status
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    handleSubmit () {
      this.submitted = true;
      const { login, password } = this;
      const { dispatch } = this.$store;
      if (login && password) {
        dispatch('authentication/login', { login, password });
      }
    },
    signUp(){
      router.push('/signup')
    }
  }
}
</script>

<style scoped>

</style>