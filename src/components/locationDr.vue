<template>
  <div
    v-if="store.location"
    @click="store.location = !store.location"
    class="fixed top-0 bg-black/10 backdrop-blur-sm left-0 h-screen w-screen z-10"
  ></div>
  <div
    :class="store.location ? 'scale-100' : 'scale-0'"
    class="container fixed duration-300 rounded-3xl top-1/2 -translate-y-1/2 left-1/2 z-20 -translate-x-1/2"
  >
    <YandexMap
      :coordinates="coordinates"
      @click="onClick"
      :zoom="16"
      class="w-full h-full"
    >
      <YandexMarker
        :coordinates="coordinates"
        :marker-id="123"
        class="w-full h-full"
      />
    </YandexMap>
    <div class="py-5 flex justify-center items-center">
      <p class="px-5 py-2 border border-primary text-primary rounded-md">
        {{ info }}
      </p>
      <p></p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import { useStore } from "../store";

const store = useStore();

const props = defineProps({
  data: Object
}) 

// const coordinates = ref([55, 33]);
const coordinates = ref([props?.data?.split(",")[0], props?.data?.split(",")[1]]);
console.log("data", props?.data);

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
