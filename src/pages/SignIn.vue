<template>
  <div class="container">
    <h2 class="title">Sign in</h2>
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
        <button v-if="authStore.loader" type="button" @click="signIn">
          Loading...
        </button>
        <button v-else type="button" @click="signIn">Sign up</button>
        <p>
          Are you not registered?
          <RouterLink to="/registration">Sign up</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref();
const password = ref();
const authStore = useAuthStore();
const router = useRouter();

const signIn = async () => {
  await authStore.auth(
    { email: email.value, password: password.value },
    'signInWithPassword'
  );
  router.push('/cars');
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
    background-color: rgba($color: #fff, $alpha: 1);
    border: 1px solid #000;
    font-family: sans-serif;
  }
}
</style>
