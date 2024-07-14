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
      <p class="text-white">{{ name }}</p>
      <div class="flex w-full justify-between mt-[70px]">
        <Regions>
          <template #first>
            <h1>Qayerdan</h1>
          </template>
        </Regions>
        <Regions>
          <template #second>
            <h1>Qayerga</h1>
          </template>
        </Regions>

        <button
          @click=""
          v-for="(item, index) in options"
          class="text-[30px] relative text-white py-7 px-[87px] rounded-md"
          :class="[
            index == options.length - 1
              ? 'bg-[#404040] px-[50px]'
              : 'bg-second/35',
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
import { useI18n } from "vue-i18n";
import Regions from "./Regions.vue";

const { t } = useI18n();

const carType = ref(1);
// const options = ref(["Qayerdan", "Qayerga", "Qachon", "Qidirish"]);
const options = ref([t("when"), t("search")]);
</script>

<style scoped>
.mainBack {
  background-repeat: no-repeat;
  background-image: url("/Main.png");
  background-size: cover;
}
</style>
