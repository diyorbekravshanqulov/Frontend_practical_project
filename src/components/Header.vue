<template>
  <div class="pt-[168px] pb-[325px] mainBack">
    <div class="container">
      <div class="flex items-center justify-center">
        <button
          @click="store.carType = 2"
          :class="[
            'text-white py-2.5 text-[26px] font-medium duration-300 px-16 border border-primary',
            store.carType == 2 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 45px 0 0 45px"
        >
          {{ $t("taxi") }}
        </button>
        <button
          @click="store.carType = 1"
          :class="[
            'text-white py-2.5 text-[26px] font-medium duration-300 px-16 border border-primary',
            store.carType == 1 ? 'bg-primary active' : 'inactive',
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
        <Calendar />

        <button
          @click="find()"
          :class="
            store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin
              ? 'bg-primary text-white'
              : 'text-white bg-[#404040]'
          "
          class="text-[30px] h-[101px] textShadow duration-500 relative py-7 rounded-md px-[50px]"
        >
          {{ $t("search") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RegionsFrom from "./RegionsFrom.vue";
import RegionsTo from "./RegionsTo.vue";
import Calendar from "./Calendar.vue";
import { useStore } from "../store";

const store = useStore();

const find = () => {
  if (store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin) {
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.mainBack {
  background-repeat: no-repeat;
  background-image: url("/Main.png");
  background-size: cover;
}
.textShadow:hover {
  text-shadow: 0 0px 5px white;
}
</style>
