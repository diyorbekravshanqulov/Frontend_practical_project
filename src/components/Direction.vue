<template>
  <div class="bg-gray-50">
    <div class="container py-[60px]">
      <div class="flex w-full justify-between mt-[70px]">
        <RegionsFromDr />
        <RegionsToDr />

        <button
          style="box-shadow: 0px 5px 10px 0px #0000001a"
          class="text-[30px] relative text-black py-7 rounded-md bg-white w-[301px] pr-28"
        >
          {{ $t("when") }}
          <Icon
            icon="bx:calendar"
            class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
          />
        </button>
        <button
          style="box-shadow: 0px 5px 10px 0px #0000001a"
          @click=""
          class="text-[30px] relative text-white py-7 rounded-md bg-primary px-[50px]"
        >
          {{ $t("search") }}
        </button>
      </div>

      <!-- options day -->

      <p class="mt-[100px] text-[42px]">{{ $t("direction") }}</p>
      <div
        class="flex w-full mt-[52px] overflow-auto scrollable-element gap-0 rounded-md shadow-lg"
      >
        <div class="flex divide-x divide-[#313131] w-full">
          <button
            v-for="(item, index) in day"
            :key="index"
            @click="selectButton(index)"
            :class="
              index === selectedButtonIndex
                ? 'bg-primary duration-300 text-white'
                : 'bg-white text-black'
            "
            class="py-7 text-[20px] w-1/6 px-[35px] whitespace-nowrap"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <!-- options leave / diraction / price -->

      <div class="grid grid-cols-3 gap-y-3">
        <p
          v-for="(item, index) in option_name"
          :key="index"
          class="text-[20px] text-center mt-[122px]"
        >
          {{ item }}
        </p>
        <div
          v-for="(item, index) in options_all_data"
          :key="index"
          @click="router.push('/about')"
          class="col-span-3 cursor-pointer mb-6 w-full grid grid-cols-3 py-[26px] rounded-md shadow-lg bg-white"
        >
          <p class="font-medium text-center text-2xl">
            {{ item.time }}
            <span class="text-center text-[22px]">{{ item.date }}</span>
          </p>
          <p class="text-center font-medium text-2xl">{{ item.where }}</p>
          <p class="font-medium text-center text-2xl">{{ item.price }}(so‘m)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegionsFromDr from "./RegionsFromDr.vue";
import RegionsToDr from "./RegionsToDr.vue";

const router = useRouter();

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
]);

const selectedButtonIndex = ref(0);

const selectButton = (index) => {
  selectedButtonIndex.value = index;
};
</script>

<style scoped>
.scrollable-element {
  scrollbar-width: none;
  /* scrollbar-gutter: both-edges;
  scrollbar-color: red yellow; */
}
</style>
