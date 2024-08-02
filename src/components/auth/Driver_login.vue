<template>
  <div
    class="bg-no-repeat bg-cover max-md:h-screen"
    style="background-image: url('/register.png')"
  >
    <div class="container py-10">
      <p class="text-[42px] max-md:text-[20px] font-medium text-white">
        {{ $t("driverLog") }}
      </p>
      <div class="flex justify-center items-center mt-16">
        <form
          @submit.prevent="loginUser"
          class="backdrop-blur-sm rounded-md md:px-[42px] md:py-11 px-[11px] py-[15px] max-md:w-full"
          style="background: rgba(185, 185, 185, 0.37)"
          action=""
        >
          <h2 class="text-white mb-10 text-2xl font-medium text-center">
            Kirish
          </h2>
          <label
            class="my-5 text-white relative text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            :for="item.key"
          >
            {{ item.label }}
            <input
              v-model="login_data[item.key]"
              class="block mt-1 w-full md:w-[406px] p-[10px] duration-300 text-black text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-transparent focus:border-primary"
              :type="switchPass ? item.type : 'text'"
              :placeholder="item.input"
              :name="item.key"
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
              v-if="item.type == 'password'"
              class="absolute z-10 top-1/2 right-0 -translate-x-3 cursor-pointer text-2xl text-black"
            />
          </label>
          <input
            type="submit"
            name=""
            class="cursor-pointer mt-5 p-[10px] text-center border-2 border-primary text-white font-medium rounded-md bg-primary w-full md:w-[406px]"
            value="Kirish"
            id=""
          />
          <router-link
            :to="{ name: 'driver_regis' }"
            class="block mt-5 text-white group"
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
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const switchPass = ref(true);

const router = useRouter();
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
      "http://95.130.227.176:3015/api/driver/signin",
      login_data.value
    );
    console.log("Login successful:", response.data);
    localStorage.setItem("access_token", response.data.tokens.access_token);
    localStorage.setItem("refresh_token", response.data.tokens.refresh_token);
    localStorage.setItem("role", "driver");
    localStorage.setItem("driver_id", response.data.driver.id);

    // await router.push({ name: "home" });
    router.push("/driver-profile");
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
