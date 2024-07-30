<template>
  <div v-if="loading" class="text-white">Loading...</div>
  <div v-if="error" class="text-white">{{ error }}</div>
  <div v-else class="bg-gray-50">
    <div class="container">
      <!-- options leave / direction / price -->
      <div class="grid grid-cols-3 max-md:-mr-4 gap-y-3 max-md:overflow-scroll scrollable-element">
        <div class="col-span-3 flex justify-between max-md:w-[650px]">
          <p
            v-for="(item, index) in option_name"
            :key="index"
            class="text-[20px] text-center mt-[122px] w-full"
          >
            {{ item }}
          </p>
        </div>
        <div
          v-for="(item, index) in options_all_data"
          :key="index"
          class="col-span-3 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-3 py-[26px] rounded-md shadow-lg bg-white"
        >
          <p class="font-medium text-center text-2xl max-md:text-lg">
            <span class="text-center md:text-[22px]">{{ item.date ? format(item.date) : "" }}</span>
          </p>
          <p class="text-center font-medium text-2xl max-md:text-lg">
            {{ item.from_district }} - {{ item.to_district }}
          </p>
          <p class="font-medium text-center text-2xl max-md:text-lg">
            500.000<span class="md:text-[20px] text-[#999] font-normal">(so‘m)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loading = ref(true);
const error = ref(null);
const option_name = ref(["Ketish", "Yo‘nalish nomi", "Narxi(so‘m)"]);
const options_all_data = ref([]);

const format = (dateString) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const GetAllOrder = async () => {
  try {
    const response = await axios.get('http://95.130.227.176:3003/api/order-taxi');
    options_all_data.value = response.data;
  } catch (err) {
    console.error('Error:', err);
    error.value = 'Something went wrong. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  GetAllOrder();
});
</script>

<style>
.scrollable-element::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Define the thumb style */
.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #f7931e 0%, #f7931e 100%);
  border-radius: 5px;
}

/* Define the track style */
.scrollable-element::-webkit-scrollbar-track {
  background-color: transparent;
  border: 1px solid transparent;
}

/* Define the button style */
.scrollable-element::-webkit-scrollbar-button {
  background-color: tr;
  border-radius: 5px;
}

.textShadow:hover {
  text-shadow: 0 0px 5px white;
}

.swiper-pagination {
  margin-top: 20px;
  position: static !important;
}

.swiper {
  margin-left: -11%;
  margin-right: -2%;
}
</style>
