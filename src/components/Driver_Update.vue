<template>
  <div
    class="duration-300 flex z-10 justify-center mt-10 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <form
      @submit.prevent="registerDriver"
      class="container backdrop-blur-sm bg-black/70 rounded-2xl w-[600px] max-md:w-full md:px-[42px] md:py-16 px-[11px] py-[15px]"
    >
      <!-- Input fields -->
      <div class="grid md:grid-cols-2 gap-x-5">
        <label
          v-for="(item, index) in data"
          :key="index"
          :class="
            index == 0 || index == 1 ? 'md:col-span-1 w-1/2' : 'md:col-span-2'
          "
          :for="'input_' + index"
          class="mb-5 relative text-white text-[17px] font-medium block w-full"
        >
          {{ item.label }}
          <input
            v-model="user_data[item.key]"
            :placeholder="item.input"
            class="block mt-1 p-[10px] w-full text-sm duration-300 placeholder-text-[#666] placeholder:font-normal rounded-md border-2 text-black border-transparent focus:border-primary"
            :type="switchPass ? item.type : 'text'"
            :id="'input_' + index"
            :class="[
              { 'scale-up': isScaling[item.key] },
              { 'pr-12': item.type === 'password' },
            ]"
            @input="handleInputChange(item.key)"
          />
          <Icon
            @click.stop="toggleSwitchPass"
            :icon="
              !switchPass
                ? 'fluent:eye-24-regular'
                : 'fluent:eye-off-24-regular'
            "
            v-if="item.type == 'password'"
            class="absolute z-10 top-1/2 right-0 -translate-x-3 cursor-pointer text-2xl text-black"
          />
        </label>
      </div>

      <!-- Submit button -->
      <input
        type="submit"
        class="cursor-pointer p-[10px] w-full text-center text-white font-medium rounded-md bg-primary mt-10"
        value="Yangilash"
      />
    </form>
  </div>
</template>
<script setup>
import axios from "axios";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";
import { useStore } from "../store";
import { defineEmits } from "vue";
const emit = defineEmits(["clicked"]);

const props = defineProps({
  user_data: Object,
});

const store = useStore();

const switchPass = ref(true);

const router = useRouter();

const isScaling = ref({
  first_name: false,
  last_name: false,
  address: false,
});
// console.log("props", props.user_data);



const user_data = ref({
  first_name: props?.user_data?.first_name,
  last_name: props?.user_data?.last_name,
  address: props?.user_data?.address,
});

const registerDriver = async () => {
  try {
    const response = await axios.patch(
      `http://95.130.227.176:3015/api/driver/${localStorage.getItem(
        "driver_id"
      )}`,
      
      user_data.value
    );

    console.log("updated data", response.data);

    emit("clicked");
  } catch (error) {
    console.error("Error updated:", error);
    toast("Something went wrong!", {
      theme: "light",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  }
};

const data = ref([
  { label: "Ismi", type: "text", input: "Ism", key: "first_name" },
  { label: "Familya", type: "text", input: "Familya", key: "last_name" },
  {
    label: "Manzil",
    input: "Manzilingizni kiriting",
    type: "text",
    key: "address",
  },
]);

const toggleSwitchPass = () => {
  isScaling.value.password = true;
  setTimeout(() => {
    isScaling.value.password = false;
  }, 300);
  switchPass.value = !switchPass.value;
};

const handleInputChange = (key) => {
  isScaling.value[key] = true;
  setTimeout(() => {
    isScaling.value[key] = false;
  }, 300);
};

</script>
<style scoped>
.scale-up {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
