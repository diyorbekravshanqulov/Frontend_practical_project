<template>
  <div class="bg-[#252831] w-full py-10">
    <div class="container flex justify-center h-full items-center w-full">
      <Loading v-if="loading" class="w-full" />
      <div v-else-if="error" class="text-white w-full">{{ error }}</div>
      <div v-else class="w-full">
        <div class="flex flex-col gap-6 items-center relative">
          <div class="absolute w-full flex justify-end items-center">
            <Icon
              @click="isEditModal = !isEditModal"
              icon="lucide:edit"
              class="text-3xl text-white font-medium cursor-pointer"
            />
          </div>
          <div v-if="data && data.photo" class="relative w-[160px] h-[160px]">
            <Loading
              v-if="loadingImg"
              class="!absolute !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 !rounded-[10px]"
            />
            <div v-else>
              <img
                :src="data.photo"
                alt="driver_photo"
                class="w-[160px] h-[160px] object-cover rounded-[10px] bg-cover"
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
    <div v-else class="flex w-full justify-between items-center  my-10">
      <div class="flex gap-10 items-center">
        <button
          class="font-medium border text-2xl border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600':
              activeButton === 'activeBtn1',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900': activeButton !== 'activeBtn1',
          }"
          @click="setActive('activeBtn1')"
        >
          Mening buyurtmalarim
        </button>
        <button
          class="font-medium border text-2xl border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600':
              activeButton === 'activeBtn2',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900': activeButton !== 'activeBtn2',
          }"
          @click="setActive('activeBtn2')"
        >
          Mening Mashinalarim
        </button>
        <button
          class="font-medium border text-2xl border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600':
              activeButton === 'activeBtn3',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900': activeButton !== 'activeBtn3',
          }"
          @click="setActive('activeBtn3')"
        >
          Faol buyurtmalar
        </button>
      </div>
      <button class="border px-4 py-1.5 border-gray-500 rounded-md text-lg duration-300 hover:bg-gray-500 hover:text-white">
        Mashina qo'shish
      </button>
    </div>
    <!-- <button class="font-medium text-2xl">{{ $t("orders") }}</button> -->

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
import Loading from "../components/Loading.vue";
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
const loadingImg = ref(false);
const error = ref(null);
const isEditModal = ref(false);

const driver_id = ref(null);

const user_data = ref({
  photo: null,
});

const activeButton = ref('activeBtn1'); // Default active button

function setActive(buttonClass) {
  activeButton.value = buttonClass;
}

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

const responseImg = ref(null);

const UpdatePhoto = async () => {
  loadingImg.value = true;
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
  } finally {
    loadingImg.value = false;
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

watch(() => isEditModal.value || responseImg?.value?.data, getDriverById, {
  immediate: true,
});

const filterBalance = () => {
  const balance = dataBalance.value.find(
    (item) => item.driverId == driver_id.value
  );
  return balance ? balance.amount : "0";
};

onMounted(() => {
  getDriverById();
});
</script>

<style lang="scss" scoped></style>
