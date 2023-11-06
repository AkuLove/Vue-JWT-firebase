<template>
  <MainHeader />
  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';
import { useAuthStore } from './stores/auth';
import { ITokens } from './types/ITokens';

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = localStorage.getItem('userTokens');
  if (tokens) {
    const parsedTokens: ITokens = JSON.parse(tokens);
    authStore.userInfo.token = parsedTokens.token;
    authStore.userInfo.refreshToken = parsedTokens.refreshToken;
  }
};
checkUser();
</script>

<style lang="scss" scoped></style>
