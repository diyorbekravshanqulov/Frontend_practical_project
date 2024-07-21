<template>
  <div
    class="h-[950px] bg-no-repeat bg-cover py-[168px]"
    style="background-image: url('/register.png')"
  >
    <div class="container">
      <p class="text-[42px] font-medium text-white">{{ $t("driverLog") }}</p>
      <div class="flex justify-center items-center mt-10">
        <form
          @submit.prevent="registerDriver"
          class="backdrop-blur-sm rounded-md px-[42px] py-11"
          style="background: rgba(185, 185, 185, 0.37)"
        >
          <h2 class="text-white mb-10 text-2xl font-medium text-center">
            Ro‘yxatdan o‘tish
          </h2>

          <!-- Input fields -->
          <label
            v-for="(item, index) in data"
            :key="index"
            :for="'input_' + index"
            class="my-5 text-white text-[17px] font-medium w-full block"
          >
            {{ item.label }}
            <input
              v-model="user_data[item.key]"
              :placeholder="item.input"
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder-text-[#666] placeholder-font-normal rounded-md border-2 text-black border-transparent focus:border-primary"
              type="text"
              :id="'input_' + index"
            />
          </label>

          <!-- File inputs -->
          <label
            v-for="(item, index) in fileInputs"
            :key="'file_' + index"
            :for="'file_' + index"
            class="my-5 text-white text-[17px] font-medium w-full block"
          >
            {{ item.label }}
            <input
              :v-model="user_data[item.key]"
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder-text-[#666] placeholder-font-normal rounded-md border-2 border-transparent focus:border-primary"
              type="file"
              :id="'file_' + index"
            />
          </label>

          <!-- Submit button -->
          <input
            type="submit"
            class="cursor-pointer mt-[10px] p-[10px] text-center text-white font-medium rounded-md bg-primary w-[406px]"
            value="Ro'yxatdan o'tish"
          />

          <!-- Router link -->
          <router-link
            :to="{ name: 'driver_login' }"
            class="block mt-5 text-white group"
          >
            Kirish
            <span class="group-hover:ml-2 m-1 text-lg duration-300"
              >&rarr;</span
            >
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";

const user_data = ref({
  first_name: "",
  last_name: "",
  phone: "",
  password: "",
  address: "",
  photo: null,
  driver_license: null,
});

const registerDriver = async () => {
  try {
    const formData = new FormData();
    for (let key in user_data.value) {
      formData.append(key, user_data.value[key]);
    }
    const response = await axios.post(
      "http://95.130.227.176:3010/api/driver/signup",
      formData
    );
    console.log("Registration successful:", response.data);
    toast.success("Registration successfully done!");
  } catch (error) {
    console.error("Error registering:", error);
    // toast.error("Something went wrong!");
  }
};

const data = ref([
  { label: "Ismi", input: "Ism", key: "name" },
  { label: "Familya", input: "Familya", key: "last_name" },
  { label: "Telfon raqam", input: "Sizning telfon raqamingiz", key: "phone" },
  { label: "Parol", input: "Sizning parolingiz", key: "password" },
  { label: "Manzil", input: "Manzilingizni kiriting", key: "address" },
]);

const fileInputs = ref([
  { label: "Rasm", input: "Rasmingizni yuklang", key: "photo" },
  {
    label: "Guvohnoma",
    input: "Guvohnomangizni yuklang",
    key: "driver_license",
  },
]);
</script>
