<template>
  <div
    class="fixed bottom-0 left-0 w-full py-10 max-md:py-5 bg-white"
    style="box-shadow: 0px 0px 5px 0px gray"
  >
    <div class="container">
      <div
        class="flex max-md:flex-col max-md:gap-[30px] items-center w-full justify-between"
      >
        <div
          class="inline-grid md:grid-cols-4 max-md:gap-y-[30px] md:gap-[30px] max-md:gap-x-4 md:w-[75%]"
        >
          <button
            class="p-[10px] cursor-default grid grid-cols-2 md:gap-12 gap-5 justify-between items-center shadow-lg col-span-2 w-full rounded-md"
          >
            <div class="w-full flex items-center gap-5 justify-between">
              <div>
                <p class="text-sm text-start text-primary">{{ $t("from") }}</p>
                <p class="text-2xl text-start mb-[10px] mt-[17px]">
                  {{ from }}
                </p>
              </div>
              <Icon
                icon="bitcoin-icons:arrow-right-filled"
                class="text-4xl text-primary"
              />
            </div>
            <div>
              <p class="text-sm text-start text-primary">{{ $t("to") }}</p>
              <p class="text-2xl text-start mb-[10px] mt-[17px]">{{ to }}</p>
            </div>
          </button>
          
          <button
            class="py-[10px] cursor-default col-span-2 px-5 max-md:-[13px] shadow-md w-3/4 rounded-md"
          >
            <div>
              <p class="text-sm text-start text-primary">Xizmat uchun to‘lov</p>
              <p
                class="text-2xl max-md:text-[20px] text-start mb-[10px] mt-[17px]"
              >
                100 km <Icon icon="mingcute:right-fill" class="text-primary inline" />
                <span
                  class="text-[#707070] ml-1 text-[20px] max-md:text-[17px] font-medium"
                  >5 000 (so‘m)</span
                >
              </p>
            </div>
          </button>
        </div>
        <button
          @click="store.confirm = !store.confirm"
          class="py-[29px] max-md:py-[14px] px-[37px] rounded-md bg-primary text-[30px] text-white"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "../store";

const store = useStore();


const to = ref(localStorage.getItem("to"));
const from = ref(localStorage.getItem("from"));
const date = ref(localStorage.getItem("date"));
</script>
