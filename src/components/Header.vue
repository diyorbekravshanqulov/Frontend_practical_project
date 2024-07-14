<template>
  <!-- class="h-screen mt-[108px] py-20 mainBack" -->
  <div class="pt-[168px] pb-[250px] mainBack">
    <div class="container">
      <div class="flex items-center justify-center">
        <button
          @click="carType = 2"
          :class="[
            'text-white py-2.5 text-[26px] font-medium duration-300 px-16 border border-primary',
            carType == 2 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 45px 0 0 45px"
        >
          {{ $t("taxi") }}
        </button>
        <button
          @click="carType = 1"
          :class="[
            'text-white py-2.5 text-[26px] font-medium duration-300 px-16 border border-primary',
            carType == 1 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 0 45px 45px 0"
        >
          {{ $t("truck") }}
        </button>
      </div>
      <h1 class="font-medium text-[42px] mt-16 text-white">
        {{ $t("service") }}
      </h1>
      <p class="mt-[30px] text-[22px] text-white">
        {{ $t("ser_offer") }}
      </p>
      <div class="flex w-full justify-between mt-[70px]">
        <RegionsFrom />
        <RegionsTo />

        <button
          class="text-[30px] relative text-white py-7 rounded-md bg-second/35 w-[301px] pr-28"
        >
          {{ $t("when") }}
          <Icon
            icon="bx:calendar"
            class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
          />
        </button>
        <button
          @click=""
          class="text-[30px] relative text-white py-7 rounded-md bg-[#404040] px-[50px]"
        >
          {{ $t("search") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import RegionsFrom from "./RegionsFrom.vue";
import RegionsTo from "./RegionsTo.vue";


const carType = ref(1);
</script>

<style scoped>
.mainBack {
  background-repeat: no-repeat;
  background-image: url("/Main.png");
  background-size: cover;
}
</style>
