<template>
  <div
    class="fixed top-0 left-0 z-20 w-full bg-primary"
    :class="isScrolled ? 'shadow-md shadow-black/30' : ''"
  >
    <div class="container py-3.5 flex items-center justify-between w-full">
      <p
        @click="router.push('/')"
        class="text-black cursor-pointer text-[40px] font-bold"
      >
        Logo
      </p>
      <div class="flex gap-[30px] items-center">
        <p
          @click="navigate(index)"
          v-for="(item, index) in 2"
          :key="index"
          class="text-lg cursor-pointer text-white font-medium"
        >
          {{ index == 0 ? $t("about") : $t("ques") }}
        </p>
        <!-- <FlagDropdown /> -->
        <selectOp />
        <Icon icon="bxs:user" class="text-white cursor-pointer text-4xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import FlagDropdown from "./FlagDropdown.vue"; // Adjust the path as necessary
import selectOp from "./selectOp.vue"; // Adjust the path as necessary
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

const navigate = (index) => {
  if (index == 0) {
    router.push("/about");
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
