<template>
  <div
    class="fixed bottom-0 left-0 w-full py-10 bg-white"
    style="box-shadow: 0px 0px 5px 0px gray"
  >
    <div class="container">
      <div class="flex items-center w-full justify-between">
        <div class="inline-grid grid-cols-4 gap-[30px] w-[75%]">
          <button
            class="p-[10px] grid grid-cols-2 gap-12 justify-between items-center shadow-lg col-span-2 w-full rounded-md"
          >
            <div class="w-full flex items-center justify-between">
              <div>
                <p class="text-sm text-start text-primary">{{ $t("from") }}</p>
                <p class="text-2xl text-start mb-[10px] mt-[17px]">Toshkent</p>
              </div>
              <Icon
                icon="bitcoin-icons:arrow-right-filled"
                class="text-4xl text-primary"
              />
            </div>
            <div>
              <p class="text-sm text-start text-primary">{{ $t("to") }}</p>
              <p class="text-2xl text-start mb-[10px] mt-[17px]">Guliston</p>
            </div>
          </button>
          <button class="py-[10px] px-5 shadow-md w-full rounded-md">
            <div>
              <p class="text-sm text-start text-primary">{{ $t("to") }}</p>
              <p class="text-2xl text-start mb-[10px] mt-[17px]">
                500
                <span class="text-[#707070] text-[20px] font-medium"
                  >(so‘m)</span
                >
              </p>
            </div>
          </button>
          <button class="py-[10px] px-5 shadow-md w-full rounded-md">
            <div>
              <p class="text-sm text-start text-primary">Xizmat uchun to‘lov</p>
              <p class="text-2xl text-start mb-[10px] mt-[17px]">
                0
                <span class="text-[#707070] text-[20px] font-medium"
                  >(so‘m)</span
                >
              </p>
            </div>
          </button>  
        </div>
        <button
          class="py-[29px] px-[37px] rounded-md bg-primary text-[30px] text-white"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
