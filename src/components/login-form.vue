<template>
  <v-card style="max-width: 50vh ">
    <v-card-text style="max-width: 50vh" class="ma-0">
      <v-container style="max-width: 50vh" class="ma-0">
        <v-row align="center" justify="center" style="max-width: 50vh" class="ma-0">
          <h1 class="title">Вход в аккаунт</h1>
        </v-row>
        <v-row align="center"
               justify="center"
               style="max-width: 50vh"
               class="ma-0">
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
            <v-row align="center" justify="center">
              <v-btn class="ma-1" @click.preventx="handleSubmit">Войти</v-btn>
              <v-dialog
                  v-model="resetForm"
                  parent
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      class="ma-1"
                      variant="plain"
                      v-bind="props"
                  >
                    Восстановить пароль
                  </v-btn>
                </template>
                <v-container>
                  <reset-password-form></reset-password-form>
                </v-container>
              </v-dialog>
            </v-row>
          </v-form>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import {useToast} from "vue-toastification";
import router from "@/router/router";
import ResetPasswordForm from "@/components/reset-password-form";

export default {
  name: "login-form",
  components: {ResetPasswordForm},
  data() {
    return {
      resetForm: false,
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
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    }
  },
  created() {
    // reset login status
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const {login, password} = this;
      const {dispatch} = this.$store;
      if (login && password) {
        dispatch('authentication/login', {login, password});
      }
    },
    signUp() {
      router.push('/signup')
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