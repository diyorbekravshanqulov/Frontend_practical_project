<template>
  <!-- class="h-screen mt-[108px] py-20 mainBack" -->
  <div 
  class="h-screen pt-[172px] mainBack"
  >
    <div class="container">
      <div class="flex items-center justify-center">
        <button
          @click="carType = 2"
          :class="[
            'text-white py-3 text-[26px] font-medium duration-300 px-[75px] border border-primary',
            carType == 2 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 45px 0 0 45px"
        >
          Taxi
        </button>
        <button
          @click="carType = 1"
          :class="[
            'text-white py-3 text-[26px] font-medium duration-300 px-[75px] border border-primary',
            carType == 1 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 0 45px 45px 0"
        >
          Yuk
        </button>
      </div>
      <h1 class="font-medium text-[42px] mt-20 text-white">
        Har kuni O'zbekiston bo'ylab taxi va yuk tashish xizmati
      </h1>
      <p class="mt-[30px] text-[22px] text-white">
        Biz viloyatlar bo'ylab hamyonbop qatnov turlarini taklif qilamiz
      </p>
      <div class="flex w-full justify-between mt-[70px]">
        <button
          v-for="(item, index) in options"
          class="text-[30px] relative text-white py-7 px-[87px] rounded-md bg-second/35"
          :class="[
            index == options.length - 1 ? 'bg-[#404040] px-[50px]' : '',
            index == options.length - 2 ? 'pr-28' : '',
          ]"
          :key="index"
        >
          {{ item }}
          <Icon
            icon="bx:calendar"
            class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
            v-show="index == options.length - 2"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const carType = ref(1);
const options = ref(["Qayerdan", "Qayerga", "Qachon", "Qidirish"]);
</script>

<style scoped>
.mainBack { 
  background-repeat: no-repeat;
  background-image: url("/Main.png");
  background-size: cover;
}
</style>
