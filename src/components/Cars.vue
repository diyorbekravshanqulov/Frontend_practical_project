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
    <div
      v-else
      class="grid grid-cols-4 w-full max-md:-mr-4 gap-y-3 max-md:overflow-scroll scrollable-element"
    >
      <div
        class="col-span-4 w-full max-md:w-[1000px] gap-x-5 grid grid-cols-6 items-center"
      >
        <p
          v-for="(item, index) in option_name"
          :key="index"
          class="text-[20px] text-center w-full"
        >
          {{ item }}
        </p>
      </div>
      <div
        v-for="(item, index) in data.driver_car"
        :key="index"
        class="col-span-4 cursor-pointer my-6 w-full max-md:w-[1000px] gap-x-5 grid grid-cols-6 items-center p-3 rounded-md bg-white"
        style="box-shadow: 0 0 5px 0 gray"
      >
        <img
          :src="item.car?.photo"
          alt="car_image"
          class="rounded-md h-[100px]"
        />
        <img
          :src="item.car?.text_passport"
          alt="car_image"
          class="rounded-md h-[100px]"
        />
        <p class="line-clamp-1 font-medium text-center text-2xl max-md:text-lg">
          {{ item.car?.model }}
        </p>
        <p class="line-clamp-1 font-medium text-center text-2xl max-md:text-lg">
          {{ item.car?.color }}
        </p>
        <p class="line-clamp-1 text-center font-medium text-2xl max-md:text-lg">
          {{ item.car?.number }}
        </p>
        <p class="line-clamp-1 font-medium text-center text-2xl max-md:text-lg">
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

const option_name = ref([
  "Mashina rasmi",
  "Tex passport",
  "Model",
  "Rangi",
  "Raqami",
  "Sig'imi",
]);

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
