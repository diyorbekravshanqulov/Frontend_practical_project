<template>
  <div class="bg-[#252831] w-full py-10">
    <div class="container">
      <div v-if="loading" class="text-white">Loading...</div>
      <div v-if="error" class="text-white">{{ error }}</div>
      <div v-else>
        <div class="flex flex-col gap-6 items-center">
          <img
            v-if="data && data.photo"
            :src="data.photo"
            alt="driver_photo"
            class="w-[160px] object-cover h-[160px] rounded-[10px] bg-cover"
          />
          <div v-else class="w-[160px] h-[160px] bg-gray-300 rounded-[10px]"></div>
          <div>
            <p class="text-[#E7E4E4] mt-2 text-center text-xl max-md:text-sm">
              ID: {{ data?.id }}
            </p>
            <p
              class="text-2xl max-md:text-lg text-center text-white font-medium"
            >
              {{ data?.first_name }} {{ data?.last_name }}
            </p>

            <p class="text-[#E7E4E4] mt-2 text-center text-xl max-md:text-sm">
              Balance: {{ dataBalance ? filterBalance() : '0' }} so'm
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container pb-20 pt-10">
    <div v-if="loading" class="text-white">Loading...</div>
    <div v-if="error" class="text-white">{{ error }}</div>
    <div v-else>
      <p class="font-medium text-3xl my-10">{{ $t("orders") }}</p>
      <p class="mt-[100px] text-[42px] max-md:hidden">{{ $t("direction") }}</p>
      <div class="md:hidden">
        <swiper
          :slidesPerView="2"
          :centeredSlides="true"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="md:hidden mt-[58px]"
        >
          <swiper-slide v-for="(item, index) in day" :key="index">
            <button
              @click="selectButton(index)"
              :class="
                index === selectedButtonIndex
                  ? 'bg-primary duration-300 text-white'
                  : 'bg-white text-black'
              "
              class="py-7 rounded-md max-md:shadow-lg md:w-1/6 shrink-0 px-[35px] whitespace-nowrap"
            >
              {{ item }}
            </button>
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="flex md:w-full max-md:hidden mt-[52px] max-md:-mx-4 overflow-hidden max-md:overflow-auto scrollable-element gap-0 rounded-md shadow-lg"
      >
        <div
          class="flex max-md:w-screen md:divide-x max-md:gap-[6px] divide-[#313131] md:w-full"
        >
          <button
            v-for="(item, index) in day"
            :key="index"
            @click="selectButton(index)"
            :class="
              index === selectedButtonIndex
                ? 'bg-primary duration-300 text-white'
                : 'bg-white text-black'
            "
            class="py-7 text-[20px] max-md:shadow-lg md:w-1/6 shrink-0 px-[35px] whitespace-nowrap"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
    <Direction />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Direction from "../components/Direction.vue";
import axios from "axios";

const data = ref(null);
const dataBalance = ref(null);
const loading = ref(true);
const error = ref(null);

const selectedButtonIndex = ref(0);

const driver_id = ref(null);

driver_id.value = localStorage.getItem("driver_id");

const getDriverById = async () => {
  try {
    const response = await axios.get(
      `http://95.130.227.176:3003/api/driver/${driver_id.value}`
    );
    const responseBalance = await axios.get(
      `http://95.130.227.176:3003/api/balance`
    );
    dataBalance.value = responseBalance.data;
    data.value = response.data;
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

const filterBalance = () => {
  const balance = dataBalance.value.find(
    (item) => item.driverId == driver_id.value
  );
  return balance ? balance.amount : "0";
};

const day = ref([
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "10-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
  "31-Aprel.2021y",
]);

onMounted(() => {
  getDriverById();
});

const selectButton = (index) => {
  selectedButtonIndex.value = index;
};
</script>

<style lang="scss" scoped></style>
