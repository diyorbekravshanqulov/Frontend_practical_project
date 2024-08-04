<template>
  <div v-if="loading" class="flex items-center justify-center h-[200px]">
    <LoadingB />
  </div>
  <div
    v-if="filteredData.length === 0"
    class="flex items-center justify-center"
  >
    <p class="text-4xl text-gray-500 my-10">Faol buyurtmalar yo'q</p>
  </div>
  <div v-if="error" class="text-white">{{ error }}</div>
  <div
    v-if="options_all_data.length === 0"
    class="flex items-center justify-center"
  >
    <p class="text-4xl text-gray-500 my-10">Buyurtmalar tarixi mavjud emas</p>
  </div>
  <div v-else>
    <div class="pt-16">
      <div
        class="grid grid-cols-4 max-md:-mr-4 gap-y-3 max-md:overflow-scroll scrollable-element"
      >
        <div class="col-span-4 flex justify-between max-md:w-[650px]">
          <p
            v-for="(item, index) in option_name"
            :key="index"
            class="text-[20px] text-center w-full"
          >
            {{ item }}
          </p>
        </div>
        <div
          v-for="(item, index) in filteredData"
          :key="index"
          class="col-span-4 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-4 py-[26px] rounded-md bg-white"
          style="box-shadow: 0 0 5px 0 gray"
        >
          <p
            class="border-b pb-5 font-medium text-center text-2xl max-md:text-lg text-blue-500"
          >
            Yangi
          </p>
          <p
            class="font-medium border-b pb-5 text-center text-2xl max-md:text-lg"
          >
            {{ item?.date ? formatHours(item.date) : "" }}
            <span class="text-center font-normal md:text-[22px]">{{
              item.date ? formatDate(item.date) : ""
            }}</span>
          </p>
          <p
            class="text-center border-b pb-5 font-medium text-2xl max-md:text-lg"
          >
            {{ item?.from_district }} - {{ item?.to_district }}
          </p>
          <p
            class="font-medium border-b pb-5 text-center text-2xl max-md:text-lg"
          >
            {{ item?.distance }}
            <Icon icon="mingcute:right-fill" class="text-primary inline" />
            <span
              class="text-[#707070] ml-1 text-[20px] max-md:text-[17px] font-medium"
            >
              {{ item?.distance ? calc(item?.distance) : "0" }} so'm
            </span>
          </p>
          <div class="col-span-4 grid grid-cols-5 justify-center items-center max-md:w-[650px] mt-3">
            <p
              v-for="(item, index) in option_name2"
              :key="index"
              class="text-[20px] border-b pb-3 text-center w-full"
            >
              {{ item }}
            </p>
          </div>
          <div
            class="col-span-4 w-full max-md:w-[650px] grid grid-cols-5 justify-center mt-5 items-center rounded-md bg-white"
          >
            <p class="text-center text-xl text-wrap max-md:text-lg font-medium">
              {{ item?.User?.phone }}
            </p>
            <p class="text-center text-xl text-wrap max-md:text-lg font-medium">
              {{ item?.User?.name }}
            </p>
            <div class="max-md:w-full mx-auto items-center max-md:flex">
              <button
                @click="store.location = !store.location"
                type="button"
                class="border border-primary rounded-md px-[47px] py-[11px]"
              >
                <Icon
                  icon="weui:location-outlined"
                  class="text-4xl text-primary"
                />
              </button>
            </div>
            <locationDr :data="item?.location" />
            <p class="text-center text-xl text-wrap max-md:text-lg font-medium">
              {{ item?.description ? item?.description : "no comment" }}
            </p>
            <div class="max-md:w-full mx-auto items-center max-md:flex">
              <button
                @click="updateStatus(item.id)"
                type="button"
                class="border font-medium text-primary border-primary rounded-md px-8 py-[11px]"
              >
                Qabul qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingB from "./LoadingB.vue";
import locationDr from "./locationDr.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";
import { useStore } from "../store";

const store = useStore();
const loading = ref(true);
const error = ref(null);
const option_name = ref([
  "Holat",
  "Ketish",
  "Yo‘nalish nomi",
  "Xizmat uchun to‘lov",
]);

const option_name2 = ref(["Telefon raqam", "Mijoz ismi", "Joylashuvi", "Izoh"]);

const options_all_data = ref([]);

const calc = (dis) => {
  return Math.ceil(dis.split(" ")[0] / 100) * 5 + " " + "000";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const formatHours = (dateString) => {
  const date = new Date(dateString);
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hour}.${minutes}`;
};

const GetAllOrder = async () => {
  try {
    const [responseTaxi, responseTruck] = await Promise.all([
      axios.get("http://95.130.227.176:3015/api/order-taxi"),
      axios.get("http://95.130.227.176:3015/api/order-truck"),
    ]);
    options_all_data.value = [...responseTaxi.data, ...responseTruck.data];
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};
const option_data = ref(null);

const filteredData = computed(() => {
  option_data.value = options_all_data.value.filter(
    (item) => item.status === "new"
  );
  return option_data.value;
});

const updateStatus = async (id) => {
  try {
    await axios.patch(
      `http://95.130.227.176:3015/api/order-taxi/update-status/${id}`,
      { status: "waiting" }
    );
    await axios.patch(
      `http://95.130.227.176:3015/api/order-taxi/${id}`,
      { driverId: +localStorage.getItem("driver_id") }
    );
    // Optionally, refresh the list after update
    await GetAllOrder();
  } catch (err) {
    console.error("Error updating status:", err);
    error.value = "Failed to update status.";
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

.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #f7931e 0%, #f7931e 100%);
  border-radius: 5px;
}

.scrollable-element::-webkit-scrollbar-track {
  background-color: transparent;
}

.textShadow:hover {
  text-shadow: 0 0px 5px white;
}
</style>
