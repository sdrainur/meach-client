<template>
  <v-navigation-drawer
      expand-on-hover
      rail
      elevation="10"
  >
    <v-list>
      <v-list-item
          prepend-icon="mdi-account-circle"
          v-bind:title="authUser.firstName+' '+authUser.secondName"
          v-bind:subtitle="'@'+authUser.login"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>


      <v-list-item prepend-icon="mdi-account" title="Профиль" @click="profileDialog=true"></v-list-item>
      <v-list-item prepend-icon="mdi-mail" title="Сообщения" value="shared" href="/main"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Пользователи" value="starred"
                   href="/users-vuetify"></v-list-item>
      <v-list-item prepend-icon="mdi-logout" title="Выход" @click="logout"></v-list-item>

      <v-dialog
          v-model="profileDialog"
          parent
      >
        <v-container style="max-width: 50vh">
          <v-card
              class="mx-auto"
              max-width="344"
          >
            <v-card-text>
              <div>Профиль</div>
              <p class="text-h4 text--primary">
                {{ authUser.firstName + ' ' + authUser.secondName }}
              </p>
              <p>{{ authUser.login }}</p>
              <v-textarea v-model="authUser.description" label="Описание" variant="outlined"></v-textarea>
              <v-switch
                  v-model="authUser.readyToMeet"
                  @click="changeStatus"
                  color="primary"
                  :label="'Готов к новым знакомтсвам ' + authUser.readyToMeet"
                  hide-details
              ></v-switch>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="setDescription"
              >
                Сохранить
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
              >
                <v-card-text class="pb-0">
                  <p class="text-h4 text--primary">
                    Origin
                  </p>
                  <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin
                    eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                      variant="text"
                      color="teal-accent-4"
                      @click="reveal = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-container>
      </v-dialog>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import {useToast} from "vue-toastification";

export default {
  name: "navigation-vuetify",
  data() {
    return {
      authUser: {
        firstName: null,
        secondName: null,
        city: null,
        login: null,
        description: null,
        readyToMeet: null
      },
      profileDialog: null
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
        .get("http://localhost:9000/user/" + this.$store.getters['authentication/getAuthenticatedLogin'], requestOptions)
        .then((response) => {
          this.authUser = response.data
        })
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  methods: {
    logout() {
      const {dispatch} = this.$store;
      dispatch('authentication/logout');
      this.$router.push('/')
    },
    changeStatus() {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .post("http://localhost:9000/user/change-status", {
            login: this.authUser.login,
            status: !this.authUser.readyToMeet
          }, requestOptions)
    },
    setDescription() {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).accessToken
        },
      }
      axios
          .put("http://localhost:9000/user/set-description", {
            login: this.authUser.login,
            description: this.authUser.description
          }, requestOptions).then(response => {
        this.toast.success('Описание профиля изменено!')
      })
    }
  }
}
</script>

<style scoped>

</style>