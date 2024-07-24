<template>
  <Navbar />

  <div
    class="h-screen bg-no-repeat bg-cover before:bg-black/25 before:backdrop-blur-sm relative before:absolute before:inset-0"
  >
    <div
      class="container py-24 flexitems-center justify-center h-full gap-10 relative z-10"
    >
      <div
        class="bg-black/30 w-full h-full flex-col backdrop-blur-md rounded-xl flex justify-between pb-60 pt-40 items-center"
        style="box-shadow: 0 0 10px 0 #f7931e"
      >
        <p
          class="text-7xl text-center text-primary font-bold"
          style="text-shadow: 0 0 5px  #F7931E"
        >
          {{ $t('loginsys') }}
        </p>
        <div class="text-center flex justify-center items-center gap-20">
          <button
            class="text-3xl cursor-pointer hover:bg-white/70 hover:text-primary duration-300 border text-white font-medium border-primary w-[300px] rounded-md py-6 bg-primary"
            style="box-shadow: 0 0 10px 0 white"
            @click="router.push('/passenger/login')"
          >
            {{ $t('passen') }}
          </button>
          <button
            class="text-3xl cursor-pointer hover:bg-white/70 hover:text-primary duration-300 border text-white font-medium border-primary w-[300px] rounded-md py-6 bg-primary"
            style="box-shadow: 0 0 10px 0 white"
            @click="router.push('/driver/login')"
          >
            {{ $t('driver') }}
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
