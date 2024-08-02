<template>
  <div class="bg-gray-50 bg-no-repeat bg-cover">
    <div class="container py-10">
      <div class="flex justify-center items-center mt-16">
        <form
          @submit.prevent="loginUser"
          class="bg-white max-md:w-full max-md:rounded-[10px] border max-md:border-primary rounded-md md:px-9 py-8 px-4 relative"
          style="box-shadow: 0px 1px 3px 0px #00000040"
          action=""
        >
          <h2 class="text-black mb-10 text-2xl font-medium text-center">
            Kirish
          </h2>
          <label
            class="my-5 text-black relative text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            :for="item.key"
          >
            {{ item.label }}
            <input
              v-model="login_data[item.key]"
              class="block mt-1 w-[406px] max-md:w-full p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-primary focus:border-primary outline-none focus:ring-0 transition-transform duration-300"
              :type="
                item.key === 'password'
                  ? switchPass
                    ? 'password'
                    : 'text'
                  : item.type
              "
              :placeholder="item.input"
              :id="item.key"
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
              v-if="item.key === 'password'"
              class="absolute z-10 top-1/2 right-0 -translate-x-3 cursor-pointer text-2xl text-black"
            />
          </label>
          <input
            type="submit"
            class="cursor-pointer mt-5 p-[10px] text-center border-2 border-primary text-black font-medium rounded-md bg-primary md:w-[406px] w-full"
            value="Kirish"
          />
          <router-link
            :to="{ name: 'passenger_regis' }"
            class="block mt-5 text-black group"
          >
            Ro‘yxatdan o‘tish
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
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const switchPass = ref(true);
const isScaling = ref({
  phone: false,
  password: false,
});

const login_data = ref({
  phone: "",
  password: "",
});

const loginUser = async () => {
  try {
    const response = await axios.post(
      "http://95.130.227.176:3015/api/users/signIn",
      login_data.value
    );
    console.log("Login successful:", response.data);
    localStorage.setItem("access_token", response.data.tokens.access_token);
    localStorage.setItem("refresh_token", response.data.tokens.refresh_token);
    localStorage.setItem("user_id", response.data.newUser.id);

    localStorage.setItem("role", "passenger");

    router.push({ name: "passenger-home" });
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Something went wrong. Please try again.");
  }
};

const data = ref([
  {
    label: "Telfon raqam",
    input: "Sizning telfon raqamingiz",
    key: "phone",
    type: "text",
  },
  {
    label: "Parolingiz",
    input: "Sizning parolingiz",
    key: "password",
    type: "password",
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
