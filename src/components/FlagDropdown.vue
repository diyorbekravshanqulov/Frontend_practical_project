<template>
  <div class="relative inline-block">
    <div
      v-if="isOpen"
      @click="toggleDropdown"
      class="fixed top-0 left-0 h-screen w-screen z-10"
    ></div>
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 dropdown bg-transparent text-white outline-none focus:outline-none"
    >
      <Icon :icon="selected.icon" class="text-4xl max-md:text-3xl" />
      <span class="md:text-lg font-medium">{{ selected.value }}</span>
    </button>
    <div
      :class="{
        'scale-100 opacity-100': isOpen,
        'scale-0 h-0 opacity-0': !isOpen,
      }"
      class="absolute mt-2 w-full bg-gray-800 text-gray-300 duration-300 shadow-lg rounded-md z-20"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="flex items-center space-x-2 p-1 cursor-pointer hover:text-white dropdown duration-300 hover:bg-gray-600 rounded-md"
      >
        <Icon :icon="option.icon" class="text-4xl w-full max-md:text-3xl h-full" />
        <span class="md:text-lg font-medium">{{ option.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "../store";
import { useI18n } from "vue-i18n";
const { locale, locales } = useI18n();

const store = useStore();

const options = [
  { value: "UZ", icon: "twemoji:flag-uzbekistan" },
  { value: "RU", icon: "twemoji:flag-russia" },
  // { value: "UZ", icon: "openmoji:flag-uzbekistan" },
  // { value: "RU", icon: "openmoji:flag-russia" },
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
    locale.value = "uz";
    store.lang = "uz";
  } else {
    locale.value = "ru";
    store.lang = "ru";
  }
};
</script>

<style scoped>
.dropdown:hover {
  text-shadow: 0 0px 3px white;
}
</style>
