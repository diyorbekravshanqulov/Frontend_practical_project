<template>
  <!-- :class="
      store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin
        ? 'before:absolute before:w-0 before:h-0 before:scale-0 before:bg-transparent before:-z-10 before:backdrop-blur-sm '
        : 'before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-white/5 before:backdrop-blur-sm before:z-10'
    " -->
  <div @click="notify()" class="relative bg-gray-50">
    <div class="container py-[60px]">
      <div
        class="flex max-md:flex-col w-full justify-between max-md:items-center max-md:gap-[30px] mt-[70px]"
      >
        <RegionsFromDr />
        <RegionsToDr />
        <CalendarDr />
        <button
          style="box-shadow: 0px 5px 10px 0px #0000001a"
          @click=""
          class="text-[30px] textShadow duration-500 max-md:w-[219px] max-md:mt-[10px] max-md:py-[14px] relative text-white py-7 rounded-md bg-primary md:px-[50px]"
        >
          {{ $t("search") }}
        </button>
      </div>
      <!-- options day -->
      <p class="mt-[100px] text-[42px] max-md:hidden">{{ $t("direction") }}</p>
      <div
        class="flex md:w-full mt-[52px] max-md:-mx-4 overflow-hidden max-md:overflow-auto scrollable-element gap-0 rounded-md shadow-lg"
      >
        <div class="flex max-md:w-screen md:divide-x max-md:gap-[6px] divide-[#313131] md:w-full">
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
      <!-- options leave / direction / price -->
      <div
        class="grid grid-cols-3 max-md:-mx-4 gap-y-3 max-md:overflow-scroll scrollable-element"
      >
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
          @click="navigate"
          class="col-span-3 cursor-pointer mb-6 w-full max-md:w-[650px] grid grid-cols-3 py-[26px] rounded-md shadow-lg bg-white"
        >
          <p class="font-medium text-center text-2xl max-md:text-lg">
            {{ item.time }}
            <span class="text-center md:text-[22px]">{{ item.date }}</span>
          </p>
          <p class="text-center font-medium text-2xl max-md:text-lg">
            {{ item.where }}
          </p>
          <p class="font-medium text-center text-2xl max-md:text-lg">
            {{ item.price
            }}<span class="md:text-[20px] text-[#999] font-normal">(so‘m)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import CalendarDr from "./CalendarDr.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegionsFromDr from "./RegionsFromDr.vue";
import RegionsToDr from "./RegionsToDr.vue";
import { useStore } from "../store";

const store = useStore();
const router = useRouter();

const notify = () => {
  toast("Please select today or a future date!", {
    theme: "dark",
    type: "warning",
    transition: "slide",
    dangerouslyHTMLString: true,
  });
};

const Direct_options = ref(["Qayerdan", "Qayerga", "Qachon", "Qidirish"]);
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

const option_name = ref(["Ketish", "Yo‘nalish nomi", "Narxi(so‘m)"]);
const options_all_data = ref([
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
  {
    time: "08:00",
    date: "21.05.2021",
    where: "Toshkent - G‘ijduvon",
    price: "500.000",
  },
]);

const selectedButtonIndex = ref(0);

const selectButton = (index) => {
  selectedButtonIndex.value = index;
};

const navigate = () => {
  if (store.carType == 1) {
    router.push("/truck-order");
  } else {
    router.push("/taxi-order");
  }
};
</script>

<style scoped>
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
</style>
