<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      @click="toggleDropdown"
      :class="!setDate ? ' py-7 pr-12' : 'pl-[15px]  py-[11px]'"
      class="text-[30px] relative text-white rounded-md bg-second/35 w-[301px]"
    >
      <div
        class="duration-300"
        :class="setDate ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("from") }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ formattedDate }}</p>
      </div>
      <div
        class="duration-300"
        :class="!setDate ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ $t("from") }}</p>
      </div>
      <Icon
        icon="bx:calendar"
        class="text-[40px] absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-10 text-primary"
      />
    </button>
    <VDatePicker
      :class="isDropdownOpen ? 'scale-100 !h-[300px] !w-full' : '!h-0 scale-0 !w-0'"
      @click="func"
      v-model="date"
      mode="date"
      class="!absolute top-[105px] !text-gray-300 duration-300 !p-5 left-0 !z-10 cursor-pointer !w-full !bg-second/35 !border-none opacity-1"
      style="box-shadow: 0 0px 10px 0 white"
    />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

const date = ref(new Date());
const setDate = ref(null);
const isDropdownOpen = ref(false);

const func = () => {
  setDate.value = date.value;
  // isDropdownOpen.value = false;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const formattedDate = computed(() => {
  if (!setDate.value) return "";
  const year = setDate.value.getFullYear();
  const month = String(setDate.value.getMonth() + 1).padStart(2, "0");
  const day = String(setDate.value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
});
</script>
