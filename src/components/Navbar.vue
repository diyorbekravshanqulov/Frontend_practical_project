<template>
  <div
    class="fixed top-0 left-0 z-20 w-full"
    :class="
      isScrolled ? 'backdrop-blur-lg bg-primary/50' : 'bg-primary'
    "
  >
    <div class="container py-3.5 flex items-center justify-between w-full">
      <p class="text-black text-[40px] font-bold">Logo</p>
      <div class="flex gap-[30px] items-center">
        <p
          v-for="(item, index) in 2"
          :key="index"
          class="text-lg text-white font-medium"
        >
          {{ index == 0 ? "Biz haqimizda" : "Savol/javob" }}
        </p>
        <FlagDropdown />
        <Icon icon="bxs:user" class="text-white text-4xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import FlagDropdown from "./FlagDropdown.vue"; // Adjust the path as necessary
import { onMounted, onUnmounted, ref } from "vue";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Add your styles here */
</style>
