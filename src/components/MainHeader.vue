<template>
  <header>
    <div class="container">
      <div class="buttons">
        <button type="button" @click="$router.push('/')">Home</button>
        <button type="button" @click="$router.push('/cars')">Cars</button>
        <button type="button" @click="$router.push('/registration')">
          Registration
        </button>
        <button type="button" @click="$router.push('/signin')">Sign in</button>
        <button type="button" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  localStorage.removeItem('userTokens');
  router.push('/signin');
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: rem(20);
}
.buttons {
  display: flex;
  column-gap: rem(8);

  button {
    padding: rem(8) rem(12);
    background-color: purple;
    color: #fff;
    border-radius: rem(4);
    font-family: sans-serif;
  }
}
</style>
