<template>
  <div class="bg-gray-50 h-[920px] bg-no-repeat bg-cover py-[168px]">
    <div class="container">
      <div class="flex justify-center items-center mt-16">
        <form
          @submit.prevent="loginUser"
          class="bg-white rounded-md px-9 py-8 relative"
          style="box-shadow: 0px 1px 3px 0px #00000040"
          action=""
        >
          <router-link
            :to="{ name: 'home' }"
            class="text-3xl text-primary absolute top-0 -translate-x-3 translate-y-3 right-0"
            >&times;</router-link
          >

          <h2 class="text-black mb-10 text-2xl font-medium text-center">
            Kirish
          </h2>
          <label
            class="my-5 text-black text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            :for="item.key"
          >
            {{ item.label }}
            <input
              v-model="login_data[item.key]"
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-primary"
              :type="item.type"
              :placeholder="item.input"
              :id="item.key"
            />
          </label>
          <input
            type="submit"
            class="cursor-pointer mt-5 p-[10px] text-center border-2 border-primary text-black font-medium rounded-md bg-primary w-[406px]"
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const login_data = ref({
  phone: "",
  password: "",
});

const loginUser = async () => {
  try {
    const response = await axios.post(
      "http://95.130.227.176:3010/api/users/signIn",
      login_data.value
    );
    console.log("Login successful:", response.data);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    router.push({ name: "home" });
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
</script>
