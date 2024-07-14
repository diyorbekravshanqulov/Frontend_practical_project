<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] w-[301px] block bg-second/35 relative text-white rounded-md"
      :class="!store.setPlacePinFrom ? 'px-[87px] py-7' : 'px-[15px] py-[11px]'"
      @click="toggleDropdown"
    >
      <div
        class="duration-300"
        :class="store.setPlacePinFrom ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("from") }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ store.setPlacePinFrom }}</p>
      </div>
      <div
        class="duration-300"
        :class="!store.setPlacePinFrom ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ $t("from") }}</p>
      </div>
    </button>
    <div
      :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
      class="absolute left-0 duration-300 mt-2 w-[600px] bg-second/35 rounded shadow-lg z-10"
    >
      <div class="flex">
        <!-- Region List -->
        <div class="w-1/2 border-r max-h-56 overflow-y-auto scrollable-element">
          <p
            v-for="(region, index) in regions"
            :key="index"
            @click="selectRegion(index)"
            :class="{
              'bg-primary text-white': selectedRegion === index,
              'hover:bg-gray-200 ': selectedRegion !== index,
            }"
            class="cursor-pointer p-2 text-sm rounded-md"
          >
            {{ region.region }}
          </p>
        </div>
        <!-- District List -->
        <div
          v-if="selectedRegion !== null"
          class="w-1/2 max-h-56 overflow-y-auto scrollable-element"
        >
          <p
            @click="
              setPlaceFromDistrict(regions[selectedRegion].region, district)
            "
            v-for="(district, districtIndex) in regions[selectedRegion]
              .district"
            :key="districtIndex"
            class="p-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md"
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
import { useStore } from "../store";

const store = useStore();


const regions = reactive(regionsData.regions);
const selectedRegion = ref(0);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (region, district) => {
  // setPlace.value = `${region}. ${district}`;
  store.setPlacePinFrom = `${region}. ${district}`;
  console.log("object", store.setPlacePinFrom);
  isDropdownOpen.value = false;
};
</script>
<style scoped>
.scrollable-element {
  scrollbar-width: none;
  /* scrollbar-gutter: both-edges;
  scrollbar-color: red yellow; */
}
</style>
