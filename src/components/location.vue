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

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import { useStore } from "../store";

const store = useStore();

const coordinates = ref([55, 33]);

const lat = ref(0);
const lng = ref(0);

const info = computed(() => {
  return `Latitude: ${coordinates.value[0].toFixed(
    2
  )}, Longitude: ${coordinates.value[1].toFixed(2)}`;
});

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      coordinates.value[0] = lat.value;
      coordinates.value[1] = lng.value;
    });
  }
};
getLocation();

localStorage.setItem("location", `${coordinates.value[0]},${coordinates.value[1]}`)
const onClick = (e) => {
  coordinates.value = e.get("coords");
  console.log(coordinates.value[0]);
  localStorage.setItem("location", `${coordinates.value[0]},${coordinates.value[1]}`)
};




const handleKeyPress = (event) => {
  if (event.key === "Escape") {
    store.location = !store.location;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
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
