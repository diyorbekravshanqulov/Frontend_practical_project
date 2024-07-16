<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      @click="toggleDropdown"
      :class="!store.setDatePin ? 'py-7 pr-12' : 'pl-[15px] py-[11px]'"
      class="text-[30px] relative text-white block rounded-md bg-white w-[301px]"
      style="box-shadow: 0px 5px 10px 0px #0000001a"
    >
      <div
        class="duration-300"
        :class="store.setDatePin ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#828282]">{{ $t("from") }}</p>
        <p class="line-clamp-1 mt-1 text-start text-black">
          {{ store.setDatePin }}
        </p>
      </div>
      <div
        class="duration-300"
        :class="!store.setDatePin ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-black">{{ $t("from") }}</p>
      </div>
      <Icon
        icon="bx:calendar"
        class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
      />
    </button>
    <VDatePicker
      :class="
        isDropdownOpen ? 'scale-100 !h-[300px] !w-full' : '!h-0 scale-0 !w-0'
      "
      @click="func"
      v-model="date"
      mode="date"
      class="!absolute top-[105px] duration-300 !p-5 left-0 !shadow-lg !z-10 cursor-pointer !w-full !border-none opacity-1"
      style="box-shadow: 0 0px 10px 0 white"
    />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useStore } from "../store";

const store = useStore();

const date = ref(new Date());
const isDropdownOpen = ref(false);

const func = () => {
  store.setDatePin = date.value;
  if (store.setDatePin) {
    const year = String(store.setDatePin.getFullYear());
    const month = String(store.setDatePin.getMonth() + 1).padStart(2, "0");
    const day = String(store.setDatePin.getDate()).padStart(2, "0");
    store.setDatePin = `${year}.${month}.${day}`;
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>
