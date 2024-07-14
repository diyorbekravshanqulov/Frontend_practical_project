<template>
  <div>
    <div
      class="container flex justify-center bg-no-repeat w-screen items-center h-screen gap-10"
    >
      <p class="text-7xl">Tizimga kirish</p>
      <div>
        <p
          class="text-3xl cursor-pointer"
          @click="router.push('/passenger/login')"
        >
          Passenger
        </p>
        <p
          class="text-3xl cursor-pointer"
          @click="router.push('/driver/login')"
        >
          Driver
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
