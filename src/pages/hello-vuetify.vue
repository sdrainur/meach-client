<template>
  <v-app class="title">
    <v-parallax
        style="height: 100vh"
        scale="0.3"
        :src="require('@/assets/23497e2dc06bd0887569943822746e58.png')"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h2 mb-4 title">
          Meach
        </h1>
        <h4 class="subheading ma-1 pb-1">
          Начните общаться прямо сейчас
        </h4>
        <v-dialog
            v-model="loginForm"
            parent
        >
          <template v-slot:activator="{ props }">
            <v-btn
                class="ma-1"
                variant="outlined"
                v-bind="props"
            >
              Авторизоваться
            </v-btn>
          </template>
          <v-container style="max-width: 50vh">
            <login-form></login-form>
          </v-container>
        </v-dialog>
        <v-dialog
            v-model="signUpForm"
            parent
        >
          <template v-slot:activator="{ props }">
            <v-btn
                class="ma-1"
                variant="plain"
                v-bind="props"
            >
              Зарегистрироваться
            </v-btn>
          </template>
          <v-container>
            <registration-form></registration-form>
          </v-container>
        </v-dialog>
        <v-icon size="50" class="ma-4" style="position: absolute; bottom: 0">mdi-arrow-down-drop-circle-outline</v-icon>
      </div>
    </v-parallax>
    <v-container>
      <v-container>
        <h1 class="text-center">Почему стоит выбрать Meach?</h1>
      </v-container>
      <v-timeline align="start">
        <v-timeline-item
            :dot-color="'orange'"
        >
          <template v-slot:opposite>
            <div
                :class="`pt-1 headline font-weight-bold text-orange`"
            ></div>
          </template>
          <div>
            <h2 :class="`mt-n1 headline font-weight-light mb-4 text-orange`">
              Лаконичность
            </h2>
            <div>
              Используя наше приложение, вас не будет отвлекать никакая лишняя информация.
              Все только самое нужное. Все просто!
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
            :dot-color="'cyan'"
        >
          <template v-slot:opposite>
            <div
                :class="`pt-1 headline font-weight-bold text-cyan`"
            ></div>
          </template>
          <div>
            <h2 :class="`mt-n1 headline font-weight-light mb-4 text-cyan`">
              Мы поможем найти вам собеседеника!
            </h2>
            <div>
              Имеется интересующая вас тема? Найдите собеседника, имеющиего схожие с вами интересы.
              Просто выберите пользователей, найдя их среди нужных категорий.
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <v-divider></v-divider>
    </v-container>
    <v-parallax
        style="height: 20vw; width: 100vw"
        :scale="0.3"
        :src="require('/src/assets/unnamed-6.jpg')"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <p class="text-h4 mb-4 title">
          Присоединяйтесь к нам!
        </p>
      </div>
    </v-parallax>
  </v-app>
</template>

<script>
import NavigationBarVuetify from "@/components/navigation-bar-vuetify";
import LoginForm from "@/components/login-form";
import RegistrationForm from "@/components/registration-form";

export default {
  name: "hello-vuetify",
  components: {RegistrationForm, LoginForm, NavigationBarVuetify},
  data() {
    return {
      loginForm: false,
      signUpForm: false,
      cards: [
        {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12},
        {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6},
        {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6},
      ],
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ],
    }
  },
  mounted() {
    document.title='Meach'
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@200;400&display=swap');

.title {
  font-family: 'Bitter', serif;
}
</style>