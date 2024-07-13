<template>
  <div class="relative inline-block">
    <div v-if="isOpen" @click="toggleDropdown" class="fixed top-0 left-0 h-screen w-screen z-10"></div>
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 bg-transparent text-white outline-none focus:outline-none"
    >
      <Icon :icon="selected.icon" class="text-4xl" />
      <span class="text-lg font-medium">{{ selected.value }}</span>
    </button>
    <div
      :class="{ 'scale-100': isOpen, 'scale-0': !isOpen }"
      class="absolute mt-2 w-full bg-white duration-300 shadow-lg rounded-md z-20"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="flex items-center space-x-2 p-1 cursor-pointer hover:bg-gray-200 rounded-md"
      >
        <Icon :icon="option.icon" class="text-4xl w-full h-full" />
        <span class="text-lg font-medium">{{ option.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
// import { i18n } from '../main.js'

const options = [
  { value: "UZ", icon: "openmoji:flag-uzbekistan" },
  { value: "RU", icon: "openmoji:flag-russia" },
];

const selected = ref(options[0]);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};


const selectOption = (option) => {
  selected.value = option;
  isOpen.value = false;

  // Assuming $i18n is your localization library or Vue i18n plugin
  if (option.value == "UZ") {
    i18n.locale = 'uz';
  } else {
    i18n.locale = 'ru';
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
