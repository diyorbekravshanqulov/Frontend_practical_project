<template>
  <div
    v-if="store.location"
    @click="store.location = !store.location"
    class="fixed top-0 bg-black/10 backdrop-blur-sm left-0 h-screen w-screen z-10"
  ></div>
  <div 
  :class="store.location? 'scale-100': 'scale-0'"
    class="container absolute rounded-3xl top-1/2 -translate-y-1/2 left-1/2 z-20 -translate-x-1/2"
  >
    <YandexMap
      :coordinates="coordinates"
      @click="onClick"
      class="w-full h-full"
    >
      <YandexMarker
        :coordinates="coordinates"
        :marker-id="123"
        class="w-full h-full"
      />
    </YandexMap>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import { useStore } from "../store";

const store = useStore();

const coordinates = ref([55, 33]);
const onClick = (e) => (coordinates.value = e.get("coords"));
</script>

<style>
.yandex-container {
  height: 600px;
}

.yandex-balloon {
  height: 400px;
  width: 200px;
}
</style>
