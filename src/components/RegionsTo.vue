<template>
  <div
    v-if="isDropdownOpen"
    @click="toggleDropdown"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
  <div class="relative">
    <button
      class="text-[30px] w-[301px] block bg-second/35 relative text-white rounded-md"
      :class="!store.setPlacePinTo ? 'px-[87px] py-7' : 'px-[15px] py-[11px]'"
      @click="toggleDropdown"
    >
      <div
        class="duration-300"
        :class="store.setPlacePinTo ? 'scale-100' : 'h-0 w-0 scale-0'"
      >
        <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("to") }}</p>
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
      class="absolute left-0 p-2 duration-300 mt-2 w-[600px] bg-second/35 rounded z-10"
      style="box-shadow: 0 0px 10px 0 white;"
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
              'hover:bg-gray-200': selectedRegion !== index,
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
import { ref, reactive, watch } from "vue";
import regionsDataJson from "../JSON/regions2.json";
import { useStore } from "../store";

const store = useStore();

// Define reactive variables
const regions = ref([]);
const selectedRegion = ref(0);
const isDropdownOpen = ref(false);

// Load regions data based on store.lang
const loadRegions = () => {
  const data = store.lang === "uz" ? regionsDataJson.uz : regionsDataJson.ru;
  regions.value = data.regions;
  selectedRegion.value = 0; // Default to the first region
  store.setPlacePinTo = ""; // Reset place pin in store
};

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Select a region
const selectRegion = (index) => {
  selectedRegion.value = index;
};

// Set place from district
const setPlaceFromDistrict = (region, district) => {
  store.setPlacePinTo = `${region}. ${district}`;
  console.log("object", store.setPlacePinTo);
  isDropdownOpen.value = false;
};

// Watch for changes in store.lang and reload regions accordingly
watch(() => store.lang, loadRegions, { immediate: true });
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
