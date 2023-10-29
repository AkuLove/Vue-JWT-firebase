<template>
  <MainHeader />
  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from './components/MainHeader.vue';

export default defineComponent({ components: { MainHeader } });
</script>

<style lang="scss" scoped></style>
