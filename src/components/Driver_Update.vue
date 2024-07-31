<template>
  <div
    @click="store.dr_update = !store.dr_update"
    :class="store.dr_update ? 'block' : 'hidden'"
    class="fixed top-0 left-0 h-screen w-screen bg-white/30 backdrop-blur-md"
  ></div>
  <div
    :class="store.dr_update ? 'scale-100' : 'scale-0'"
    class="duration-300 flex justify-center mt-10 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <form
      @submit.prevent="registerDriver"
      class="container backdrop-blur-sm bg-black/70 rounded-2xl w-[600px] max-md:w-full md:px-[42px] md:py-14 px-[11px] py-[15px]"
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
          <p class="text-white text-[17px] font-medium">Rasmingiz</p>
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
          <p class="text-white text-[17px] font-medium">Guvohnomazgiz rasmi</p>
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
        value="Yangilash"
      />
    </form>
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
  first_name: false,
  last_name: false,
  phone: false,
  password: false,
  address: false,
});

const user_data = ref({
  first_name: "",
  last_name: "",
  phone: "",
  password: "",
  address: "",
  //   photo: null,
  //   driver_license: null,
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
  user_data.value.driver_license = event.target.files[0];
};

const registerDriver = async () => {
  try {
    const formData = new FormData();
    for (let key in user_data.value) {
      console.log(key);
      if (key == "driver_license" || key == "photo") {
        formData.append(key, user_data.value[key]);
      }
    }

    const response = await axios.patch(
      `http://95.130.227.176:3003/api/driver/${localStorage.getItem(
        "driver_id"
      )}`,
      user_data.value
      //   {
      //     first_name: user_data.first_name,
      //     last_name: user_data.last_name,
      //     phone: user_data.phone,
      //     password: user_data.password,
      //     address: user_data.address,
      //   }
    );

    // const responseImg = await axios.patch(
    //   `http://95.130.227.176:3003/api/driver/image/${localStorage.getItem(
    //     "driver_id"
    //   )}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    console.log("updated data", response.data);
    // console.log("updated img", responseImg.data);
    store.dr_update = !store.dr_update
    router.push({ name: "driver-profile" });
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
    label: "Telfon raqam",
    type: "text",
    input: "Sizning telfon raqamingiz",
    key: "phone",
  },
  {
    label: "Parol",
    input: "Sizning parolingiz",
    key: "password",
    type: "password",
  },
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
