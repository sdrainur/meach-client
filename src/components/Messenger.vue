<template>
  <v-container class="fill-height">
    <v-row class="fill-height pb-14" align="end">
      <v-col>
        <div v-for="(item, index) in chat" :key="index"
             :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]">
          <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
          <v-avatar :color="item.from == 'user' ? 'indigo': 'red'" size="36">
            <span class="white--text">{{ item.from[0] }}</span>
          </v-avatar>
          <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-navigation class="messagebox">
    <v-container class="ma-0 pa-0">
      <v-row no-gutters>
        <v-col>
          <div class="d-flex flex-row align-center">
            <v-text-field v-model="msg" placeholder="Type Something" @keypress.enter="send"></v-text-field>
            <v-btn icon @click="send"><v-icon>mdi-send</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-bottom-navigation>
</template>

<script>
import axios from "axios";

export default {
  name: "messenger-vuetify",

}
</script>

<style scoped>

</style>