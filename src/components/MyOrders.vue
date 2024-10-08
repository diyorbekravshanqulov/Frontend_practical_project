<template>
  <div v-if="loading" class="flex items-center justify-center h-[200px]">
    <LoadingB />
  </div>
  <div v-if="error" class="text-white">{{ error }}</div>
  <div
    v-if="filteredOptions.length === 0"
    class="flex items-center justify-center"
  >
    <p class="text-4xl text-gray-500 my-10">Faol buyurtmalar yo'q</p>
  </div>
  <div v-else>
    <div class="pt-16">
      <!-- options leave / direction / price -->
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
          v-for="(item, index) in filteredOptions"
          :key="index"
          class="col-span-4 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-4 py-[26px] rounded-md bg-white"
          style="box-shadow: 0 0 5px 0 gray"
        >
          <p
            :class="{
              'text-blue-500': returnStatus(item.status) === 'Yangi',
              'text-yellow-400': returnStatus(item.status) === 'Kutish',
              'text-green-500': returnStatus(item.status) === 'Yo\'lda',
              'text-red-500': returnStatus(item.status) === 'Tugallangan',
              'font-medium': true,
              'text-center': true,
              'text-2xl': true,
              'max-md:text-lg': true,
            }"
            class="border-b pb-5"
          >
            {{ returnStatus(item.status) }}
          </p>
          <p
            class="font-medium border-b pb-5 text-center text-2xl max-md:text-lg"
          >
            {{ item.date ? formatHours(item.date) : "" }}
            <span class="text-center font-normal md:text-[22px]">{{
              item.date ? formatDate(item.date) : ""
            }}</span>
          </p>
          <p
            class="text-center border-b pb-5 font-medium text-2xl max-md:text-lg"
          >
            {{ item.from_district }} - {{ item.to_district }}
          </p>
          <p
            class="font-medium border-b pb-5 text-center text-2xl max-md:text-lg"
          >
            {{ item.distance }}
            <Icon icon="mingcute:right-fill" class="text-primary inline" />
            <span
              class="text-[#707070] ml-1 text-[20px] max-md:text-[17px] font-medium"
              >{{ item.distance ? calc(item.distance) : "0" }} so'm</span
            >
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
            class="col-span-4 w-full max-md:w-[650px] grid-cols-5 grid justify-center mt-5 items-center rounded-md bg-white"
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
                @click="handleClick(item.id, item.status)"
                type="button"
                class="border font-medium text-primary border-primary rounded-md px-8 py-[11px]"
              >
                {{ item.status == "onroad" ? "Tugatish" : "Yo'lga chiqish" }}
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
const options_all_data = ref([]);
const option_name2 = ref(["Telefon raqam", "Mijoz ismi", "Joylashuvi", "Izoh"]);
const lastClickTime = ref(0); // Track the last click time

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

const returnStatus = (status) => {
  if (status === "new") {
    return "Yangi";
  } else if (status === "waiting") {
    return "Kutish";
  } else if (status === "onroad") {
    return "Yo'lda";
  } else if (status === "finished") {
    return "Tugallangan";
  }
  return "";
};

// Computed property to filter out 'finished' statuses
const filteredOptions = computed(() =>
  options_all_data.value.filter(
    (item) =>
      item.status !== "finished" &&
      item.status !== "new" &&
      item.driverId == +localStorage.getItem("driver_id")
  )
);

const GetAllOrder = async () => {
  try {
    // const [responseTaxi, responseTruck] = await Promise.all([
    //   axios.get("http://95.130.227.176:3015/api/order-taxi"),
    //   axios.get("http://95.130.227.176:3015/api/order-truck"),
    // ]);
    const responseTaxi = await axios.get(
      "http://95.130.227.176:3015/api/order-taxi"
    );

    // options_all_data.value = [...responseTaxi.data, ...responseTruck.data];
    options_all_data.value = [...responseTaxi.data];
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (id) => {
  try {
    await axios.patch(
      `http://95.130.227.176:3015/api/order-taxi/update-status/${id}`,
      { status: "onroad" }
    );
    await GetAllOrder();
  } catch (err) {
    console.error("Error updating status:", err);
    error.value = "Failed to update status.";
  }
};

const updateStatusFinish = async (id) => {
  try {
    await axios.patch(
      `http://95.130.227.176:3015/api/order-taxi/update-status/${id}`,
      { status: "finished" }
    );
    await GetAllOrder();
  } catch (err) {
    console.error("Error updating status:", err);
    error.value = "Failed to update status.";
  }
};

// Handler for click event
const handleClick = (id, status) => {
  if (status == "onroad") {
    // Check if double-click (300ms threshold)
    updateStatusFinish(id);
  } else {
    updateStatus(id);
  }
  lastClickTime.value = now; // Update last click time
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
