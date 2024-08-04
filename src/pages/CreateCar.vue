w
<template>
  <div class="py-5">
    <div class="container relative">
      <div class="fixed top-1/2 left-1/2 max-md:w-full -translate-x-1/2 -translate-y-1/2">
        <form
          @submit.prevent="createCar"
          class="bg-gray-800 md:rounded-[10px] w-[600px] max-md:w-full md:px-[42px] md:py-11 px-[11px] py-[15px]"
        >
          <!-- Input fields -->
          <div class="grid md:grid-cols-2 gap-x-5">
            <label
              v-for="(item, index) in data"
              :key="index"
              :class="
                index == 0 || index == 1 || index == 2 || index == 3
                  ? 'md:col-span-1 w-1/2'
                  : 'md:col-span-2'
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

          <!-- File inputs -->
          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <p class="text-white text-[17px] font-medium">Mashina rasmi</p>
              <div
                @click="openFile1"
                class="flex mt-1 cursor-pointer rounded-md gap-7 px-3 py-2 items-center bg-white"
              >
                <Icon
                  icon="material-symbols:upload"
                  class="text-3xl text-primary"
                />
                <span class="font-medium text-second line-clamp-1">{{
                  filename1
                }}</span>
              </div>
              <input
                ref="fileInput1"
                id="image"
                class="hidden mt-1 p-[10px] text-sm placeholder-text-[#666] placeholder-font-normal rounded-md border-2 border-transparent focus:border-primary"
                type="file"
                @change="getValue"
              />
            </div>
            <!-- -- -->
            <div>
              <p class="text-white text-[17px] font-medium">
                Tex passport
              </p>
              <div
                @click="openFile2"
                class="flex mt-1 cursor-pointer rounded-md gap-7 px-3 py-2 items-center bg-white"
              >
                <Icon
                  icon="material-symbols:upload"
                  class="text-3xl text-primary"
                />
                <span class="font-medium text-second line-clamp-1">{{
                  filename2
                }}</span>
              </div>
              <input
                ref="fileInput2"
                id="driver_image"
                class="hidden mt-1 p-[10px] text-sm placeholder-text-[#666] placeholder-font-normal rounded-md border-2 border-transparent focus:border-primary"
                type="file"
                @change="getValueDriver"
              />
            </div>
          </div>

          <!-- Submit button -->
          <input
            type="submit"
            class="cursor-pointer p-[10px] w-full text-center text-white font-medium rounded-md bg-primary mt-10"
            value="Yaratish"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";
import { useStore } from "../store";

const store = useStore();

const switchPass = ref(true);

const router = useRouter();

const isScaling = ref({
  model: false,
  color: false,
  number: false,
  capacity: false,
});

const user_data = ref({
  model: "",
  color: "",
  number: "",
  photo: null,
  text_passport: null,
  capacity: "",
});

const filename1 = ref("Choose a file ...");
const filename2 = ref("Choose a file ...");

const fileInput1 = ref(null);
const fileInput2 = ref(null);

const openFile1 = () => {
  if (fileInput1.value) {
    fileInput1.value.click();
  }
};

const openFile2 = () => {
  if (fileInput2.value) {
    fileInput2.value.click();
  }
};

const getValue = (event) => {
  filename1.value = event.target.files[0].name;
  user_data.value.photo = event.target.files[0];
};

const getValueDriver = (event) => {
  filename2.value = event.target.files[0].name;
  user_data.value.text_passport = event.target.files[0];
};

const createCar = async () => {
  try {
    const formData = new FormData();
    for (let key in user_data.value) {
      formData.append(key, user_data.value[key]);
    }

    const response = await axios.post(
      "http://95.130.227.176:3015/api/car",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const responseCon = await axios.post(
      "http://95.130.227.176:3015/api/driver-car",
      {
        carId: response.data.id,
        driverId: +localStorage.getItem("driver_id"),
      }
    );
    console.log("response", response.data);
    console.log("responseCon", responseCon.data);
    router.push({ name: "driver-profile" });
  } catch (error) {
    console.error("Error registering:", error);
    toast("Something went wrong!", {
      theme: "light",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  }
};

const data = ref([
  { label: "Modeli", type: "text", input: "Model", key: "model" },
  { label: "Rangi", type: "text", input: "Rangi", key: "color" },
  {
    label: "Mashina raqami",
    type: "text",
    input: "Mashina raqami",
    key: "number",
  },
  {
    label: "Mashina sig'imi",
    input: "Mashina sig'imi",
    key: "capacity",
    type: "text",
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
