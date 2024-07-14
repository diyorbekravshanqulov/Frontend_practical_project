<template>
  <div class="bg-slate-50 h-screen py-[168px]">
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-14">
          <button
            @click="router.push('/')"
            class="text-primary px-[30px] py-[17px] rounded-md border border-primary bg-white flex gap-4 text-lg"
          >
            <Icon
              icon="solar:arrow-left-linear"
              class="text-[28px] font-extrabold text-primary"
            />Orqaga
          </button>
          <div class="flex items-center gap-5">
            <p class="text-[42px] font-medium text-[#313131]">Buyurtma</p>
            <div class="flex items-end gap-[10px]">
              <span class="text-2xl text-[#2C2C2C]">12:00</span>
              <span class="text-[22px] text-[#2C2C2C]">21.05.2021</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <p class="text-[20px]">Yo‘lovchi soni</p>
          <div class="grid grid-cols-4 items-center h-[50px] w-[176px]">
            <button
              class="bg-[#D8D8D8] outline-none font-medium text-[25px] h-full px-3"
              @click="decrementCount"
              style="border-radius: 5px 0 0 5px"
            >
              -
            </button>
            <span
              class="col-span-2 border h-full text-lg flex items-center justify-center px-4 border-[#D8D8D8]"
              >{{ count }} ta</span
            >
            <button
              class="bg-primary outline-none text-white font-medium text-[25px] h-full px-3"
              @click="incrementCount"
              style="border-radius: 0 5px 5px 0"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <form
        class="w-full rounded-[50px] grid grid-cols-3 border border-primary bg-white mt-[50px] p-20"
        action=""
      >
        <label
          v-for="(item, index) in data"
          :key="index"
          for=""
          class="text-sm font-medium"
        >
          {{ item.label }}
          <input
            type="text"
            class="p-2 block mt-[5px] w-[270px] font-normal border border-primary rounded-md"
            name=""
            :placeholder="item.input"
          />
        </label>
        <div>
          <p class="font-medium text-sm mt-20">
            Olib ketish manzilini belgilang
          </p>
          <button
            class="mt-[9px] border border-primary rounded-md px-[47px] py-[11px]"
          >
            <Icon icon="weui:location-outlined" class="text-4xl text-primary" />
          </button>
        </div>
      </form>
    </div>
    <Confirm />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Confirm from '../components/Confirm.vue'

const router = useRouter();
const count = ref(1);

const incrementCount = () => {
  count.value++;
};

const decrementCount = () => {
  if (count.value > 1) {
    count.value--;
  }
};

const data = ref([
  {
    label: "Ismi",
    input: "Ismi",
  },
  {
    label: "Familya",
    input: "Familya",
  },
  {
    label: "Telfon raqam",
    input: "Sizning telfon raqamingiz",
  },
]);
</script>
