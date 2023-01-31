<template>
  <v-app-bar class="app-bar" style="box-shadow: none;">
    <div class="container">
      <div class="app__bar__inner">
        <p class="title">Meach</p>
        <div class="about__user">
          <v-btn
              icon
          >
            <v-avatar size="36px">
              <v-img :src="require('../assets/images/6-sep-2017-beauty-salons-where-are-best-face-peeli-op.jpg.jpg')"/>
            </v-avatar>
            <v-overlay
                activator="parent"
                location="bottom center"
                location-strategy="connected"
            >
              <v-container>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    style="justify-content: center; background: #eeeded"
                >
                  <v-card-text>
                    <v-container style="display: flex; padding: 0; align-items: center">
                      <v-avatar size="80px">
                        <v-img
                            :src="require('../assets/images/6-sep-2017-beauty-salons-where-are-best-face-peeli-op.jpg.jpg')"/>
                      </v-avatar>
                      <v-container>
                        <p class="user__name">Имя Фамилия</p>
                        <p class="text__primary">mail@mail.ru</p>
                        <p class="text__primary">@Login</p>
                      </v-container>
                    </v-container>
                    <v-divider color="#636363"></v-divider>
                    <v-container class="button__list">
                      <v-btn
                          prepend-icon="mdi-cog-outline"
                          class="text__primary button"
                      >
                        Настройки
                      </v-btn>
                      <v-btn
                          prepend-icon="mdi-help-circle-outline"
                          class="text__primary button"
                      >
                        Помощь
                      </v-btn>
                      <v-btn
                          prepend-icon="mdi-logout"
                          class="text__primary button"
                      >
                        Выход
                      </v-btn>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-overlay>
          </v-btn>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@500&display=swap');

.container {
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
}

.app__bar__inner {
  display: flex;
  justify-content: space-between;
}

.title {
  font-family: 'Montserrat', sans-serif;
  margin: auto 0;
  text-transform: uppercase;
  font-weight: 550;
  font-size: 30px;
}

.user__name {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin-bottom: 6px;
  font-size: 25px;
  font-weight: 500;
}

.text__primary {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin: 3px 0;
  font-size: 15px;
  font-weight: 400;
}

.button__list {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.button {
  margin: 0;
}
</style>