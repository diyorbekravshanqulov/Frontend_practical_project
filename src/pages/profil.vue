<template>
  <div class="bg-[#252831] w-full py-10">
    <div class="container">
      <div v-if="loading" class="text-white">Loading...</div>
      <div v-if="error" class="text-white">{{ error }}</div>
      <div v-else>
        <div class="flex flex-col gap-6 items-center">
          <img
            :src="data?.photo"
            alt="driver_photo"
            class="w-[160px] object-cover h-[160px] rounded-[10px] bg-cover"
          />
          <!-- <p>{{ data }}</p> -->
          <div>
            <p
              class="text-2xl max-md:text-lg text-center text-white font-medium"
            >
              {{ data?.first_name }} {{ data?.last_name }}
            </p>
            <p class="text-[#E7E4E4] mt-2 text-center text-xl max-md:text-sm">
              ID: {{ data?.id }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div v-if="loading" class="text-white">Loading...</div>
    <div v-if="error" class="text-white">{{ error }}</div>
    <div v-else>
      <p class="font-medium text-3xl my-10">{{ $t("orders") }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const driver_id = ref(null);

driver_id.value = localStorage.getItem("driver_id");

const getDriverById = async () => {
  try {
    const response = await axios.get(
      `http://95.130.227.176:3003/api/driver/${driver_id.value}`
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
  getDriverById();
});
</script>

<style lang="scss" scoped></style>
