<template>
  <div>
    <Loading v-if="loading" class="w-full" />
    <div v-else-if="error" class="text-white w-full">{{ error }}</div>
    <div
      v-if="!data?.driver_car?.length"
      class="flex items-center justify-center"
    >
      <p class="text-4xl text-gray-500 my-10">Mashina qo'shilmagan</p>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in data.driver_car"
        :key="index"
        class="col-span-4 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-4 py-[26px] rounded-md shadow-lg bg-white"
      >
        <p class="font-medium text-center text-2xl max-md:text-lg">
          {{ item.car?.model }}
        </p>
        <p class="font-medium text-center text-2xl max-md:text-lg">
          {{ item.car?.color }}
        </p>
        <p class="text-center font-medium text-2xl max-md:text-lg">
          {{ item.car?.number }}
        </p>
        <p class="font-medium text-center text-2xl max-md:text-lg">
          {{ item.car?.capacity }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Loading from "./Loading.vue";

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const getCars = async () => {
  try {
    const response = await axios.get(
      `http://95.130.227.176:3015/api/driver/${localStorage.getItem(
        "driver_id"
      )}`
    );
    data.value = response.data;
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getCars();
});
</script>
