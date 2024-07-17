<template>
  <div>
    <!-- Click overlay to close the dropdown -->
    <div
      v-if="isDropdownOpen"
      @click="toggleDropdown"
      class="fixed top-0 left-0 h-screen w-screen z-10"
    ></div>

    <div class="relative">
      <!-- Dropdown toggle button -->
      <button
        class="text-[30px] w-[301px] block bg-second/35 relative text-white rounded-md"
        :class="
          store.setPlacePinFrom ? 'px-[15px] py-[11px]' : 'px-[87px] py-7'
        "
        @click="toggleDropdown"
      >
        <!-- When place is set -->
        <div v-if="store.setPlacePinFrom" class="duration-300">
          <p class="text-[20px] text-start text-[#D1D1D1]">{{ $t("from") }}</p>
          <p class="line-clamp-1 mt-1 text-start">
            {{ store.setPlacePinFrom }}
          </p>
        </div>
        <!-- When place is not set -->
        <div v-else class="duration-300">
          <p>{{ $t("from") }}</p>
        </div>
      </button>

      <!-- Dropdown menu -->
      <div
        :class="isDropdownOpen ? 'scale-100' : 'h-0 scale-0 w-0'"
        class="absolute left-0 duration-300 mt-2 p-2 w-[600px] bg-second/35 rounded z-10"
        style="box-shadow: 0 0px 10px 0 white"
      >
        <div class="flex">
          <!-- Region List -->
          <div
            class="w-1/2 border-r max-h-56 overflow-y-auto scrollable-element"
          >
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
              v-for="(district, districtIndex) in regions[selectedRegion]
                ?.district"
              :key="districtIndex"
              @click="
                setPlaceFromDistrict(regions[selectedRegion].region, district)
              "
              class="p-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md"
            >
              {{ district }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import regionsDataJson from "../JSON/regions2.json";
import { useStore } from "../store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const regions = ref([]);
const selectedRegion = ref(null); // Initialize with null

const isDropdownOpen = ref(false);

// Load regions data based on store.lang
const loadRegions = () => {
  const data = store.lang === "uz" ? regionsDataJson.uz : regionsDataJson.ru;
  regions.value = data.regions;
  selectedRegion.value = 0; // Default to the first region
};

// Watch for changes in store.lang and reload regions accordingly
watch(() => store.lang, loadRegions, { immediate: true });

// Watch for changes in store.setPlacePinFrom and update as needed
watch(
  () => store.setPlacePinFrom,
  (newValue) => {
  }
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (index) => {
  selectedRegion.value = index;
};

const setPlaceFromDistrict = (region, district) => {
  store.setPlacePinFrom = `${region}. ${district}`;
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.scrollable-element::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom right, #f7931e 0%, #f7931e 100%);
  border-radius: 5px;
}

.scrollable-element::-webkit-scrollbar-track {
  background-color: transparent;
  border: 1px solid transparent;
}

.scrollable-element::-webkit-scrollbar-button {
  background-color: transparent;
  border-radius: 5px;
}
</style>
