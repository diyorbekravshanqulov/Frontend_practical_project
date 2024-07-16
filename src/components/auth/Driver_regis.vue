<template>
  <div
    class="h-[950px] bg-no-repeat bg-cover py-[168px]"
    style="background-image: url('/register.png')"
  >
    <div class="container">
      <p class="text-[42px] font-medium text-white">
        {{ $t("driverLog") }}
      </p>
      <div class="flex justify-center items-center mt-10">
        <form
          class="backdrop-blur-sm rounded-md px-[42px] py-11"
          style="background: rgba(185, 185, 185, 0.37)"
          action=""
        >
          <h2 class="text-white mb-10 text-2xl font-medium text-center">
            Ro‘yxatdan o‘tish
          </h2>
          <label
            class="my-5 text-white text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            for="name"
            >{{ item.label }}
            <input
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-transparent focus:border-primary"
              type="text"
              :placeholder="item.input"
              name="name"
              id=""
            />
          </label>
          <input
            type="submit"
            name=""
            class="cursor-pointer mt-[10px] p-[10px] text-center text-white font-medium rounded-md bg-primary w-[406px]"
            value="Ariza qoldirish"
            id=""
          />
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
import { ref } from "vue";

const data = ref([
  {
    label: "Ismi",
    input: "Ism",
  },
  {
    label: "Telfon raqam",
    input: "Sizning telfon raqamingiz",
  },
  {
    label: "Parol",
    input: "Sizning parolingiz",
  },
  {
    label: "Mashina rusumi",
    input: "Rusumni kiriting",
  },
]);
</script>
