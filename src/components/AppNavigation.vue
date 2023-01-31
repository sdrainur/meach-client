<template>
  <div class="navigation">
    <v-btn
        variant="text"
        class="button"
        prepend-icon="mdi-account-outline"
    >
      Профиль
    </v-btn>
    <v-btn
        variant="text"
        class="button"
        prepend-icon="mdi-account-multiple-outline"
    >
      Коучеры
    </v-btn>
    <v-btn
        variant="text"
        class="button"
        prepend-icon="mdi-chat-outline"
    >
      Сообщения
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "AppNavigation"
}
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  max-width: 250px;
}

.button {
  margin: 5px;
  justify-content: start;
}
</style>