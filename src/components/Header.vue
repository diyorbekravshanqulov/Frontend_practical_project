<template>
  <div
    class="mainBack duration-300"
    :class="
      store.calen
        ? 'pb-[370px] max-md:pb-[200px]'
        : 'max-md:pb-[150px] pb-[200px]'
    "
  >
    <div class="container">
      <div class="flex items-center justify-center">
        <button
          @click="store.carType = 2"
          :class="[
            'text-white py-2.5 max-md:py-2 md:text-[26px] font-medium duration-300 px-16 max-md:px-12 border border-primary',
            store.carType == 2 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 45px 0 0 45px"
        >
          {{ $t("taxi") }}
        </button>
        <button
          @click="store.carType = 1"
          :class="[
            'text-white py-2.5 max-md:py-2 md:text-[26px] font-medium duration-300 px-16 max-md:px-12 border border-primary',
            store.carType == 1 ? 'bg-primary active' : 'inactive',
          ]"
          style="border-radius: 0 45px 45px 0"
        >
          {{ $t("truck") }}
        </button>
      </div>
      <h1
        class="font-medium text-[42px] max-md:text-[22px] mt-16 max-md:mt-12 text-white"
      >
        {{ $t("service") }}
      </h1>
      <p class="mt-[30px] max-md:mt-4 text-[22px] max-md:text-lg text-white">
        {{ $t("ser_offer") }}
      </p>
      <div
        class="flex w-full max-md:items-center max-md:gap-[30px] max-md:flex-col justify-between mt-[70px] max-md:mt-10"
      >
        <RegionsFrom />
        <RegionsTo />
        <Calendar />

        <button
          @click="find()"
          :class="
            store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin
              ? 'bg-primary text-white'
              : 'text-white bg-[#404040]'
          "
          class="text-[30px] h-[101px] max-md:mt-[10px] max-md:w-[219px] textShadow duration-500 relative md:py-2 py-[14px] rounded-md md:px-4"
        >
          {{ $t("search") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RegionsFrom from "./RegionsFrom.vue";
import RegionsTo from "./RegionsTo.vue";
import Calendar from "./Calendar.vue";
import { useStore } from "../store";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";

const store = useStore();

const router = useRouter();

const find = () => {
  if (!store.token) {
    toast("Please register or login!", {
      theme: "light",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  } else if (store.setPlacePinFrom && store.setPlacePinTo && store.setDatePin) {
    if (store.setPlacePinFrom == store.setPlacePinTo) {
      toast("Please select another place!", {
        theme: "light",
        type: "warning",
        transition: "bounce",
        dangerouslyHTMLString: true,
      });
    } else {
      if (store.carType == 1) {
        router.push("/truck-order");
      } else {
        router.push("/taxi-order");
      }
    }
  } else {
    toast("Please fill all details!", {
      theme: "light",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  }
};
</script>

<style scoped>
.mainBack {
  background-repeat: no-repeat;
  background-image: url("/Main.png");
  background-size: cover;
  background-attachment: fixed;
  padding-top: 150px;
  /* padding-bottom: 325px; */
}

.textShadow:hover {
  text-shadow: 0 0px 5px white;
}

@media screen and (max-height: 768px) {
  .mainBack {
    padding-top: 100px;
  }
}
@media screen and (max-width: 500px) {
  .mainBack {
    padding-top: 50px;
  }
}

@media screen and (min-height: 901px) {
  .mainBack {
    height: 100vh;
  }
}
</style>
