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
            <p :class="data?.phone? '': 'hidden'" class="text-[#E7E4E4] mt-2 text-center text-xl max-md:text-sm">
              {{ data ? phoneFormat(data?.phone): "" }}
            </p>

            <p class="text-[#E7E4E4] mt-2 text-center text-xl max-md:text-sm">
              Balance: {{ dataBalance ? filterBalance() : "0" }} so'm
            </p>
          </div>
          <form
            @submit.prevent="updateBalance"
            class="md:absolute bottom-0 left-0"
          >
            <label
              class="text-white flex flex-col gap-5 items-start justify-center text-lg"
              >Balance qo'shish
              <input
                v-model="updateedB"
                type="number"
                class="rounded-md focus:ring-0 outline-transparent border-none bg-white/30 p-2 px-3"
              />
              <input
                type="submit"
                value="Qo'shish"
                class="rounded-md max-md:w-full px-6 py-2 bg-white/30 cursor-pointer hover:bg-white/15 duration-300"
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="container pb-20 pt-10">
    <div v-if="loading" class="text-white">Loading...</div>
    <div v-if="error" class="text-white">{{ error }}</div>
    <div v-else class="flex w-full max-md:flex-col justify-between items-center md:my-10 ">
      <div class="flex mdgap-10 gap-5 max-md:shrink-0 max-md:flex-col  items-center">
        <button
          class="font-medium border md:text-2xl text-lg border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600': activeButton === 'activeBtn3',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900':
              activeButton !== 'activeBtn3',
          }"
          @click="setActive('activeBtn3')"
        >
          Faol buyurtmalar
        </button>
         <button
          class="font-medium border md:text-2xl text-lg border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600': activeButton === 'activeBtn4',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900':
              activeButton !== 'activeBtn4',
          }"
          @click="setActive('activeBtn4')"
        >
          Mening buyurtmalarim
        </button>
        <button
          class="font-medium border md:text-2xl text-lg border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600': activeButton === 'activeBtn1',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900':
              activeButton !== 'activeBtn1',
          }"
          @click="setActive('activeBtn1')"
        >
          Buyurtmalar tarixi
        </button>
        
        <button
          class="font-medium border md:text-2xl text-lg border-l-transparent border-r-transparent border-t-transparent duration-300"
          :class="{
            ' border-b-2 border-gray-600': activeButton === 'activeBtn2',
            'text-gray-500  border-b-2 border-transparent hover:text-gray-900':
              activeButton !== 'activeBtn2',
          }"
          @click="setActive('activeBtn2')"
        >
          Mening Mashinalarim
        </button>
      </div>
      <button
        @click="router.push('/create-car')"
        class="border px-4 py-1.5 max-md:my-10 border-gray-500 rounded-md text-lg duration-300 hover:bg-gray-500 hover:text-white"
      >
        Mashina qo'shish
      </button>
    </div>

    <DirectionAll v-if="activeButton == 'activeBtn3'" />
    <History v-if="activeButton == 'activeBtn1'" />
    <MyOrders v-if="activeButton == 'activeBtn4'" />
    <Cars v-if="activeButton == 'activeBtn2'" />
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
import History from "../components/History.vue";
import MyOrders from "../components/MyOrders.vue";
import Cars from "../components/Cars.vue";
import DriverUpdate from "../components/Driver_Update.vue";
import Back from "../components/back.vue";
import axios from "axios";
import { useStore } from "../store";
import { useRouter } from "vue-router";

const store = useStore();
const fileInput1 = ref(null);
const router = useRouter();

const data = ref(null);
const dataBalance = ref(null);
const loading = ref(true);
const loadingImg = ref(false);
const error = ref(null);
const isEditModal = ref(false);

const driver_id = ref(null);
const balance = ref(null);

const updateedB = ref(5000);

const user_data = ref({
  photo: null,
});

const phoneFormat = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');

  if (cleaned.length === 12 && cleaned.startsWith('998')) {
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
  }  
  return phone;
}

const activeButton = ref("activeBtn3"); // Default active button

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
console.log(driver_id.value);

const reponseBalance = ref(null)
const updateBalance = async () => {
  try {
    const today = new Date();
    const isoString = today.toISOString();
    reponseBalance.value = await axios.patch(
      `http://95.130.227.176:3015/api/balance/${balance.value.id}`,
      {
        amount: updateedB.value,
        driverId: +driver_id.value,
        date: isoString
      }
    );
    console.log("responseBalance", reponseBalance.value.data);
  } catch (error) {
    error.value = "Something went wrong. Please try again.";
  }
};

const response = ref(null);
const GetDriver = async () => {
  response.value = await axios.get(
    `http://95.130.227.176:3015/api/driver/${driver_id.value}`
  );
};

const responseBalance = ref(null);
const GetBalance = async () => {
  responseBalance.value = await axios.get(
    `http://95.130.227.176:3015/api/balance`
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
      `http://95.130.227.176:3015/api/driver/image/${localStorage.getItem(
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

watch(() => isEditModal.value || responseImg?.value?.data || reponseBalance?.value?.data, getDriverById, {
  immediate: true,
});

const filterBalance = () => {
  balance.value = dataBalance.value.find(
    (item) => item.driverId == driver_id.value
  );
  return balance.value ? balance.value.amount : "0";
};

onMounted(() => {
  getDriverById();
});
</script>

<style scoped>
input {
  outline: none;
}
</style>
