<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <div class="container">
        <app-navigation></app-navigation>
        <div style="width: 100%;">
          <div class="content">
            <v-card class="content__header shadow">
              <v-card-item>
                <v-avatar size="200px">
                  <v-img
                      :src="require('../assets/images/6-sep-2017-beauty-salons-where-are-best-face-peeli-op.jpg.jpg')"
                  ></v-img>
                </v-avatar>
              </v-card-item>
              <div style="padding: 0 15px">
                <v-card-title class="user__name">Имя Фамилия</v-card-title>
                <v-card-text class="text__primary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                  aspernatur
                  aut beatae cumque dicta distinctio dolorem excepturi exercitationem, ipsam itaque nemo neque officia
                  optio porro, provident quis, saepe sed ut?
                </v-card-text>
                <v-card-text class="text__primary">
                  <v-icon icon="mdi-map-marker-outline" style=""></v-icon>
                  Казань
                </v-card-text>
              </div>
            </v-card>
            <v-card class="content__header shadow">
              <v-sparkline></v-sparkline>
            </v-card>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
import AppNavigation from "@/components/AppNavigation";

export default {
  name: "User.vue",
  components: {AppNavigation, AppBar},
  data() {
    return {
      rating: 4.5
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 15px 0 0 0;
}

.content {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.content__header {
  display: flex;
  width: 100%;
  border-radius: 15px;
  padding: 15px;
  margin: 15px;
  background: rgba(251, 251, 251, 0.42);
}

.shadow {
  -webkit-box-shadow: 17px 6px 29px 10px rgba(34, 60, 80, 0.07);
  -moz-box-shadow: 17px 6px 29px 10px rgba(34, 60, 80, 0.07);
  box-shadow: 17px 6px 29px 10px rgba(34, 60, 80, 0.07);
}

.user__name {
  font-family: 'Montserrat', sans-serif;
  text-align: start;
  font-size: 30px;
  font-weight: 500;
}

.text__primary {
  font-family: 'Montserrat', sans-serif;
  text-align: start;
  font-size: 15px;
  font-weight: 400;
}

</style>