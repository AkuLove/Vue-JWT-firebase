<template>
  <div class="container">
    <h2>Cars</h2>
    <div>
      <ul>
        <div v-if="loader">Loading...</div>
        <li v-for="(car, index) in cars" :key="index">
          <p>{{ car.name }}</p>
          <p>{{ car.type }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AxiosError } from 'axios';
import { ISignUpError } from '../types/ISignUpError';
import { ICars } from '../types/ICars';
import axiosApiInstance from '../api';

const loader = ref(false);
const cars = ref<ICars[]>();

const getAllCars = async () => {
  loader.value = true;
  try {
    const response = await axiosApiInstance.get<ICars[]>(
      `https://vue-jwt-firebase-2084a-default-rtdb.europe-west1.firebasedatabase.app/cars.json`
    );
    cars.value = response.data;
  } catch (err) {
    const error = err as AxiosError<ISignUpError>;
    console.log(error.message);
  } finally {
    loader.value = false;
  }
};

onMounted(async () => {
  await getAllCars();
});
</script>
