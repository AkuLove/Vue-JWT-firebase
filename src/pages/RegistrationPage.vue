<template>
  <div class="container">
    <h2 class="title">Sign up</h2>
    <form class="form">
      <span v-if="authStore.errorMessage">{{ authStore.errorMessage }}</span>
      <div>
        <span>
          <i></i>
        </span>
        <input v-model="email" type="text" />
      </div>
      <div>
        <span>
          <i></i>
        </span>
        <input v-model="password" type="password" />
      </div>
      <div>
        <button v-if="authStore.loader" type="button" @click="signUp">
          Loading...
        </button>
        <button v-else type="button" @click="signUp">Sign up</button>
        <p>
          Are you already registered?
          <RouterLink to="/signin">Sign in</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const email = ref();
const password = ref();
const authStore = useAuthStore();

const signUp = async () => {
  await authStore.signUp({ email: email.value, password: password.value });
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: rem(8);
}
.form {
  display: flex;
  flex-direction: column;
  row-gap: rem(12);

  input {
    font-size: rem(16);
    padding: rem(4);
    border-radius: rem(4);
    background-color: rgba($color: purple, $alpha: 1);
    color: #fff;
    font-family: sans-serif;
  }
}
</style>
