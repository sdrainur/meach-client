<template>

  <v-navigation-drawer v-model="sidebar" app>
    <v-list>
      <v-list-item>
        <v-list-item-title>hello</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar >
<!--    <v-toolbar class="toolbar width_full" fluid app>-->
    <span class="hidden-sm-and-up">
      <v-btn @click="sidebar=!sidebar"></v-btn>
      </span>
      <v-toolbar-title>Meach</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>Вход</v-btn>
        <v-btn>Регистрация</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-btn>Профиль</v-btn>
          <v-btn>Сообщения</v-btn>
          <v-btn>Пользователи</v-btn>
          <v-btn>Выход</v-btn>
        </v-list>
      </v-menu>
<!--    </v-toolbar>-->
  </v-app-bar>
</template>

<script>
export default {
  name: "navigation-bar-vuetify",
  data() {
    return {
      sidebar: false,
    }
  }
}
</script>

<style scoped>
.toolbar {
}
</style>