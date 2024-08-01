<template>
  <div class="bg-[#252831] w-full py-10">
    <div class="container">
      <div v-if="loading" class="text-white">Loading...</div>
      <div v-if="error" class="text-white">{{ error }}</div>
      <div v-else>
        <div class="flex flex-col gap-6 items-center relative">
          <div class="absolute w-full flex justify-end items-center">
            <Icon
              @click="isEditModal = !isEditModal"
              icon="lucide:edit"
              class="text-3xl text-white font-medium cursor-pointer"
            />
          </div>
          <div v-if="data && data.photo" class="relative">
            <img
              :src="data.photo"
              alt="driver_photo"
              class="w-[160px] object-cover h-[160px] rounded-[10px] bg-cover"
            />
            <Icon
              @click="openFile1"
              icon="ic:outline-photo-camera"
              class="absolute duration-300 text-transparent cursor-pointer hover:backdrop-blur-sm hover:text-white top-1/2 left-1/2 -translate-x-1/2 p-10 -translate-y-1/2 hover:bg-white/30 w-full h-full rounded-[10px]"
            />
            <input
              ref="fileInput1"
              id="image"
              class="hidden mt-1 p-[10px] text-sm placeholder-text-[#666] placeholder-font-normal rounded-md border-2 border-transparent focus:border-primary"
              type="file"
              @change="getValue"
            />
          </div>
          <div
            v-else
            class="w-[160px] h-[160px] bg-gray-300 rounded-[10px]"
          ></div>
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
              Balance: {{ dataBalance ? filterBalance() : "0" }} so'm
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
      <button class="font-medium text-3xl">Mashina qo'shish</button>
      <!-- <p class="mt-[100px] text-[42px] max-md:hidden">{{ $t("direction") }}</p> -->
      <!-- <div class="md:hidden">
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
      </div> -->
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
    <DirectionAll />
  </div>
  <!--  -->
  <div v-if="data">
    <DriverUpdate
      :class="isEditModal ? 'scale-100' : 'scale-0'"
      class="duration-300"
      :user_data="data"
      @clicked="isEditModal = !isEditModal"
    />
    <Back v-if="isEditModal" @close-driver="isEditModal = !isEditModal" />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, watch } from "vue";
import DirectionAll from "../components/DirectionAll.vue";
import DriverUpdate from "../components/Driver_Update.vue";
import Back from "../components/back.vue";
import axios from "axios";
import { useStore } from "../store";

const store = useStore();
const fileInput1 = ref(null);

const data = ref(null);
const dataBalance = ref(null);
const loading = ref(true);
const error = ref(null);
const isEditModal = ref(false);

const selectedButtonIndex = ref(0);

const driver_id = ref(null);

const user_data = ref({
  photo: null,
});

const openFile1 = () => {
  if (fileInput1.value) {
    fileInput1.value.click();
  }
};

const getValue = (event) => {
  user_data.value.photo = event.target.files[0];
};

driver_id.value = localStorage.getItem("driver_id");

const response = ref(null);
const GetDriver = async () => {
  response.value = await axios.get(
    `http://95.130.227.176:3003/api/driver/${driver_id.value}`
  );
};

const responseBalance = ref(null);
const GetBalance = async () => {
  responseBalance.value = await axios.get(
    `http://95.130.227.176:3003/api/balance`
  );
};

const responseImg = ref(null)

const UpdatePhoto = async () => {
  try {
    const formData = new FormData();
    for (let key in user_data.value) {
      console.log(key);
      if (key == "photo") {
        formData.append(key, user_data.value[key]);
      }
    }
    responseImg.value = await axios.patch(
      `http://95.130.227.176:3003/api/driver/image/${localStorage.getItem(
        "driver_id"
      )}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", responseImg.value.data);
  } catch (error) {
    console.error("Error:", error);
    error.value = "Something went wrong. Please try again.";
  }
};

watch(() => user_data.value.photo, UpdatePhoto);

const getDriverById = async () => {
  try {
    await GetDriver();
    await GetBalance();
    data.value = response.value.data;
    dataBalance.value = responseBalance.value.data;
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

watch(() => isEditModal.value || responseImg?.value?.data, getDriverById, { immediate: true });

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
