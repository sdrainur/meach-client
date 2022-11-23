<template>
  <v-app>
    <v-app-bar :elevation="2" title="Meach" class="title"></v-app-bar>
    <v-main>
      <v-container style="max-width: 50%">
        <v-row align="center" justify="center" style="margin: 2ch">
          <h1 class="title">Вход в аккаунт</h1>
        </v-row>
        <v-row align="center"
               justify="center">
            <v-form
                ref="form"
            >
              <v-text-field
                  v-model="login"
                  label="Логин"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  type="password"
                  label="Пароль"
                  required
              ></v-text-field>
              <v-btn class="mr-4" @click.preventx="handleSubmit">Войти</v-btn>
              <v-btn @click.prevent="signUp">Регистрация</v-btn>
            </v-form>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {useToast} from "vue-toastification";
import router from "@/router/router";

export default {
  name: "login-vuetify",
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
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap');
.title{
  font-family: 'Raleway', sans-serif;
}
</style>