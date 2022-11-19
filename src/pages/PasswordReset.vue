<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="reset">
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>c
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PasswordReset.vue"
}
</script>

<style scoped>

</style>