<template>
  <div>
    <MainNavbar />
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavbar from './components/mainNavbar.vue';

export default defineComponent({ components: { MainNavbar } });
</script>

<style lang="scss" scoped></style>
