<template>
  <Navbar />

  <div class="bg-black/5">
    <div
      class="container flex items-center justify-center w-full h-screen   gap-10 relative"
    >
      <div
        class="w-full h-full flex-col rounded-xl gap-10 flex justify-center items-center"
      >
        <p
          class="text-7xl max-md:text-3xl text-center text-primary font-bold"
          style="text-shadow: 0 0 5px #f7931e"
        >
          {{ $t("loginsys") }}
        </p>
        <div class="text-center flex max-md:flex-col max-md:gap-5 justify-center items-center gap-20">
          <button
            class="text-3xl max-md:text-xl cursor-pointer hover:bg-white/70 hover:text-primary duration-300 border text-white font-medium border-primary md:w-[300px] w-[150px] rounded-md py-6 max-md:py-3 bg-primary"
            style="box-shadow: 0 0 10px 0 white"
            @click="router.push('/passenger/login')"
          >
            {{ $t("passen") }}
          </button>
          <button
            class="text-3xl max-md:text-xl cursor-pointer hover:bg-white/70 hover:text-primary duration-300 border text-white font-medium border-primary md:w-[300px] w-[150px] rounded-md py-6 max-md:py-3 bg-primary"
            style="box-shadow: 0 0 10px 0 white"
            @click="router.push('/driver/login')"
          >
            {{ $t("driver") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../../components/Navbar.vue";

import { useRouter } from "vue-router";

const router = useRouter();
</script>
