<template>
  <div class="app">
    <div class="sticky-top">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Meach</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/user">Домашняя</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/messenger">Сообщения</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/users">Пользователи</a>
              </li>
              <li class="nav-item" >
                <a class="nav-link" href="" @click="logout">Выход</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {authentication} from "@/store/authentication.module";

export default {
  name: "Navbar",
  computed: {
    user() {
      return this.$store.state.authentication.user()
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    }

  },
  methods: {
    logout() {
      const {dispatch} = this.$store;
      dispatch('authentication/logout');
    }
  }
}
</script>

<style scoped>

</style>