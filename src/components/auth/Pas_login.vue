<template>
  <div class="bg-gray-50 h-[920px] bg-no-repeat bg-cover py-[168px]">
    <div class="container">
      <div class="flex justify-center items-center mt-16">
        <form
          class="bg-white rounded-md px-9 py-8 relative"
          style="box-shadow: 0px 1px 3px 0px #00000040"
          action=""
        >
          <button
            @click="router.push('/')"
            class="text-3xl text-primary absolute top-0 -translate-x-3 translate-y-3 right-0"
            >&times;</button
          >

          <h2 class="text-black mb-10 text-2xl font-medium text-center">
            Kirish
          </h2>
          <label
            class="my-5 text-black text-[17px] font-medium w-full block"
            v-for="(item, index) in data"
            :key="index"
            for="name"
            >{{ item.label }}
            <input
              class="block mt-1 w-[406px] p-[10px] text-sm placeholder:text-[#666] placeholder:font-normal rounded-md border-2 border-primary"
              type="text"
              :placeholder="item.input"
              name="name"
              id=""
            />
          </label>
          <input
            type="submit"
            name=""
            class="cursor-pointer mt-5 p-[10px] text-center border-2 border-primary text-black font-medium rounded-md bg-primary w-[406px]"
            value="Kirish"
            id=""
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const data = ref([
  {
    label: "Telfon raqam",
    input: "Sizning telfon raqamingiz",
  },
  {
    label: "Parolingiz",
    input: "Sizning parolingiz",
  },
]);
</script>
