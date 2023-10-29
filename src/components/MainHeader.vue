<template>
  <header>
    <div class="container">
      <div class="buttons">
        <button type="button" @click="$router.push('/')">Home</button>
        <button type="button" @click="$router.push('/registration')">
          Registration
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
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
