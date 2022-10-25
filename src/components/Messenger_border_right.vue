<template>
  <div class="col-12 col-lg-5 col-xl-3 border-right">

    <div class="px-4 d-none d-md-block">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <input type="text" class="form-control my-3" placeholder="Search...">
        </div>
      </div>
    </div>

    <div v-for="user in users">
      <a href="#" class="list-group-item list-group-item-action border-0">
        <div class="badge bg-success float-right">5</div>
        <div class="d-flex align-items-start">
          <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1" alt="Vanessa Tucker"
               width="40" height="40">
          <div class="flex-grow-1 ml-3">
            {{ user.firstName + " " + user.secondName }}
            <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
          </div>
        </div>
      </a>
    </div>

    <hr class="d-block d-lg-none mt-1 mb-0">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Messenger_border_right",
  data() {
    return {
      users: null
    }
  },
  mounted() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
      },
    }
    axios
        .get("http://localhost:9000/user/users", requestOptions)
        .then(response=>{
          this.users = response.data
        })
  }
}
</script>

<style scoped>

</style>