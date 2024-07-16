<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] w-[301px] block bg-white relative text-black rounded-md"
      style="box-shadow: 0px 5px 10px 0px #0000001a"
      :class="!store.setPlacePinTo ? 'px-[87px] py-7' : 'px-[15px] py-[11px]'"
      @click="toggleDropdown"
    >
      <div
        class="duration-300"
        :class="store.setPlacePinTo ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#828282]">{{ $t("to") }}</p>
        <p class="line-clamp-1 mt-1 text-start">{{ store.setPlacePinTo }}</p>
      </div>
      <div
        class="duration-300"
        :class="!store.setPlacePinTo ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p>{{ $t("to") }}</p>
      </div>
    </button>
    <div
      :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
      class="absolute left-0 p-2 duration-300 mt-2 w-[600px] bg-white rounded shadow-lg z-10"
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
const setPlace = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (region, district) => {
  // setPlace.value = `${region}. ${district}`;
  store.setPlacePinTo = `${region}. ${district}`;
  console.log("object", store.setPlacePinTo);
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.scrollable-element::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Define the thumb style */
.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #F7931E 0%, #F7931E 100%);
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
</style>
