<template>
  <div class="bg-[#252831] w-full py-10">
    <div class="container">
      <p class="text-white">Driver Data:</p>
      <div v-if="loading" class="text-white">Loading...</div>
      <div v-if="error" class="text-white">{{ error }}</div>
      <div v-else>
        <p class="text-white">{{ data }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const route = useRoute();

const getDriverById = async () => {
  try {
    const response = await axios.get(
      `http://95.130.227.176:3003/api/driver/${route.params.id}`
    );
    data.value = response.data;
  } catch (err) {
    console.error("Error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getDriverById();
});
</script>

<style lang="scss" scoped></style>
