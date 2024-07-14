<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] bg-second/35 px-[87px] relative text-white py-7 rounded-md"
      @click="toggleDropdown"
    >
      <slot name="first"></slot>
      <slot name="second"></slot>
    </button>
    <div
      :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
      class="absolute left-0 duration-300 mt-2 w-[600px] bg-second/35 rounded shadow-lg z-10"
    >
      <div class="flex">
        <!-- Region List -->
        <div class="w-1/2 border-r max-h-56 overflow-y-auto">
          <p
            v-for="(region, index) in regions"
            :key="index"
            @click="selectRegion(index)"
            :class="{
              'bg-primary rounded-md text-white': selectedRegion === index,
              'hover:bg-gray-200 hover:rounded-md': selectedRegion !== index,
            }"
            class="cursor-pointer p-2 text-sm"
          >
            {{ region.region }}
          </p>
        </div>
        <!-- District List -->
        <div
          v-if="selectedRegion !== null"
          class="w-1/2 max-h-56 overflow-y-auto"
        >
          <p
            v-for="(district, districtIndex) in regions[selectedRegion]
              .district"
            :key="districtIndex"
            class="p-2 text-sm hover:bg-gray-200 cursor-pointer"
          >
            {{ district }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import regionsData from "../JSON/regions.json";

const regions = reactive(regionsData.regions);
const selectedRegion = ref(null);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};
</script>

<!-- <style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style> -->
