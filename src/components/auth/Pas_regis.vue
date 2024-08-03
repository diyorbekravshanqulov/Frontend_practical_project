<template>
  <div class="bg-gray-50 bg-no-repeat bg-cover">
    <div class="container py-10">
      <div class="flex justify-center items-center mt-10">
        <form
          class="bg-white max-md:w-full max-md:rounded-[10px] border max-md:border-primary rounded-md md:px-9 py-8 px-4 relative"
          @submit.prevent="registerDriver"
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
              class="block mt-1 w-full md:w-[406px] p-[10px] text-sm duration-300 placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-primary focus:border-primary outline-none focus:ring-0"
              :type="getInputType(item.key)"
              :placeholder="item.input"
              :id="item.key"
              :class="[
                { 'scale-up': isScaling[item.key] },
                { 'pr-12': item.type === 'password' },
              ]"
              @input="handleInputChange(item.key)"
            />
            <Icon
              @click.stop="toggleVisibility(item.key)"
              :icon="getIconType(item.key)"
              v-if="item.type === 'password'"
              class="absolute z-10 top-1/2 right-0 -translate-x-3 cursor-pointer text-2xl text-black"
            />
          </label>
          <input
            type="submit"
            class="cursor-pointer mt-[10px] p-[10px] text-center text-black font-medium rounded-md bg-primary w-full md:w-[406px]"
            value="Davom etish"
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
import { useStore } from "../../store";

const store = useStore();
const router = useRouter();

const isScaling = ref({
  name: false,
  phone: false,
  password: false,
  confirm_password: false,
});

const user_data = ref({
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
});

const visibility = ref({
  password: false,
  confirm_password: false,
});

const registerDriver = async () => {
  if (user_data.value.password !== user_data.value.confirm_password) {
    alert("Passwords do not match!");
    return;
  }
  try {
    const response = await axios.post(
      "http://95.130.227.176:3015/api/users/newOtp",
      { phone: user_data.value.phone }
    );

    store.user_datas = user_data.value;
    console.log("user_data", response.data);
    router.push({ name: "passenger_verify" });
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
  if (key === "password" || key === "confirm_password") {
    visibility.value[key] = !visibility.value[key];
  }
};

const getInputType = (key) => {
  if (key === "password" || key === "confirm_password") {
    return visibility.value[key] ? "text" : "password";
  }
  return "text"; // Default type
};

const getIconType = (key) => {
  if (key === "password" || key === "confirm_password") {
    return visibility.value[key]
      ? "fluent:eye-24-regular"
      : "fluent:eye-off-24-regular";
  }
  return "";
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
