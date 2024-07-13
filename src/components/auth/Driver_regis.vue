<template>
  <div
    class="h-[950px] bg-no-repeat bg-cover py-[168px]"
    style="background-image: url('/register.png')"
  >
    <div class="container">
      <p class="text-[42px] font-medium text-white">
        Viloyatlar bo‘ylab taksi haydovchisi sifatida ishlash
      </p>
      <div class="flex justify-center items-center mt-16">
        <form
          class="backdrop-blur-sm rounded-md px-[42px] py-11"
          style="background: rgba(185, 185, 185, 0.37)"
          action=""
        >
          <h2 class="text-white mb-10 text-2xl font-medium text-center">
            Ro‘yxatdan o‘tish
          </h2>
          <label class="my-5 text-white text-[17px] font-medium w-full block" v-for="(item, index) in data" :key="index" for="name"
            >{{ item.label }}
            <input class=" block mt-1 w-[406px] p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-transparent focus:border-primary" type="text" :placeholder="item.input" name="name" id="" />
          </label>
          <input type="submit" name="" class="cursor-pointer mt-[10px] p-[10px] text-center text-white font-medium rounded-md bg-primary w-[406px]"  value="Ariza qoldirish" id="">
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
    label: "Yashash manziligiz",
    input: "Sizning raqamingiz",
  },
  {
    label: "Mashina rusumi",
    input: "Rusumni kiriting",
  },
]);
</script>
