<template>
  <Navbar></Navbar>
  <br/>
  <div class="container">
    <h1 class="h-100 d-flex align-items-center justify-content-center">
      Подтверждение
    </h1>
    <br/>
    <form class="row g-3">
      <div class="col-md-12">
        <label for="inputPassword4" class="form-label">Код подтверждения отправлен. Проверьте вашу почту.</label>
        <input type="text" class="form-control" placeholder="Введите код" v-model="activationCode">
        <div class="invalid-feedback">Password is required</div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" @click="activate">Подтвердить</button>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router/router";

export default {
  name: "ActivationPage",
  components: {Navbar},
  data() {
    return {
      activationCode: null
    }
  },
  methods: {
    activate() {
      fetch('http://localhost:9000/signup/activate', {
        method: 'post',
        body: JSON.stringify({
          activationCode: this.activationCode
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      router.push('/home');
    }
  }
}
</script>

<style scoped>

</style>