<template>
  <div class="h-[950px] bg-gray-50 bg-no-repeat bg-cover py-[168px]">
    <div class="container">
      <div class="flex justify-center items-center mt-10">
        <form
          @submit.prevent="registerDriver"
          class="bg-white rounded-md px-9 py-8 relative"
          style="box-shadow: 0px 1px 3px 0px #00000040"
          action=""
        >


          <h2 class="text-black mb-10 text-2xl font-medium text-center">
            Ro‘yxatdan o‘tish
          </h2>
          <label
            class="my-5 text-black relative text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            :for="item.key"
          >
            {{ item.label }}
            <input
              v-model="user_data[item.key]"
              :class="item.type == 'password' ? 'pr-12' : ''"
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-primary focus:border-primary outline-none focus:ring-0"
              :type="getInputType(item.key, item.type)"
              :placeholder="item.input"
              :id="item.key"
            />
            <Icon
              @click.stop="toggleVisibility(item.key)"
              :icon="getIconType(item.key)"
              v-if="item.type == 'password'"
              class="absolute z-10 top-1/2 right-0 -translate-x-3 cursor-pointer text-2xl text-black"
            />
          </label>
          <input
            type="submit"
            class="cursor-pointer mt-[10px] p-[10px] text-center text-black font-medium rounded-md bg-primary w-[406px]"
            value="Ro’yxatdan o’tish"
          />
          <router-link
            :to="{ name: 'passenger_login' }"
            class="block mt-5 text-black group"
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
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const user_data = ref({
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
});

const registerDriver = async () => {
  if (user_data.value.password !== user_data.value.confirm_password) {
    alert("Passwords do not match!");
    return;
  }
  try {
    const response = await axios.post(
      "http://95.130.227.176:3003/api/users/signUp",
      user_data.value
    );
    console.log("Registration successful:", response.data);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    router.push({ name: "home" });
  } catch (error) {
    console.error("Error registering:", error);
    alert("Something went wrong. Please try again.");
  }
};

const data = ref([
  { label: "Ismi", input: "Ism", key: "name", type: "text" },
  {
    label: "Telfon raqam",
    input: "Sizning telfon raqamingiz",
    key: "phone",
    type: "text",
  },
  {
    label: "Parol",
    input: "Sizning parolingiz",
    key: "password",
    type: "password",
  },
  {
    label: "Parolni tasdiqlash",
    input: "Parolingizni tasdiqlang",
    key: "confirm_password",
    type: "password",
  },
]);

const toggleVisibility = (key) => {
  if (key === "password") {
    passwordVisible.value = !passwordVisible.value;
  } else if (key === "confirm_password") {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};

const getInputType = (key, type) => {
  if (type !== "password") return type;
  if (key === "password") return passwordVisible.value ? "text" : "password";
  if (key === "confirm_password")
    return confirmPasswordVisible.value ? "text" : "password";
};

const getIconType = (key) => {
  if (key === "password")
    return passwordVisible.value
      ? "fluent:eye-24-regular"
      : "fluent:eye-off-24-regular";
  if (key === "confirm_password")
    return confirmPasswordVisible.value
      ? "fluent:eye-24-regular"
      : "fluent:eye-off-24-regular";
};
</script>
