<template>
  <div class="container flex justify-center items-center h-screen gap-10">
    <p class="text-3xl cursor-pointer" @click="router.push('/passenger/login')">Passenger</p>
    <p class="text-3xl cursor-pointer" @click="router.push('/driver/login')">Driver</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
