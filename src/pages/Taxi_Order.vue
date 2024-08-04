<template>
  <div class="bg-slate-50 md:h-full py-10 max-md:pb-[220px] max-md:pt-[100px]">
    <div class="md:container pb-40">
      <div
        class="flex max-md:flex-col px-4 max-md:gap-[8px] items-center md:justify-between"
      >
        <div
          class="flex items-center gap-2 max-md:justify-between max-md:w-full md:gap-14"
        >
          <button
            @click="router.push('/')"
            class="text-primary px-[30px] max-md:text-sm py-[17px] max-md:py-[9px] max-md:px-[7px] rounded-md border border-primary bg-white flex md:gap-4 gap-2 items-center text-lg"
          >
            <Icon
              icon="solar:arrow-left-linear"
              class="text-[28px] max-md:text-xl font-extrabold text-primary"
            />Orqaga
          </button>
          <div class="flex items-center md:gap-5 max-md:items-end gap-2">
            <p class="text-[42px] max-md:text-2xl font-medium text-[#313131]">
              Buyurtma
            </p>
            <div class="flex items-end gap-[10px]">
              <span class="text-2xl max-md:text-sm text-[#2C2C2C]">12:00</span>
              <span class="text-[22px] max-md:text-sm text-[#2C2C2C]"
                >21.05.2021</span
              >
            </div>
          </div>
        </div>
        <div
          class="flex items-center md:gap-x-5 gap-1 max-md:w-full max-md:justify-between"
        >
          <p class="text-[20px] max-md:text-[22px]">Yo‘lovchi soni</p>
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
        class="w-full max-md:mt-10 max-md:gap-y-4 md:gap-y-10 rounded-[50px] grid md:grid-cols-3 border border-primary bg-white mt-[50px] p-20 max-md:py-6 max-md:px-4 max-md:rounded-md"
        action=""
      >

        <textarea
          name=""
          v-model="u_data.description"
          rows="3"
          cols="1"
          class="col-span-3 focus:border-primary focus:ring-0 p-2 font-normal border border-primary rounded-md"
        ></textarea>
        <div class="max-md:w-full justify-between items-center max-md:flex">
          <p class="font-medium text-sm md:mt-5">
            Olib ketish manzilini belgilang
          </p>
          <button
            @click="store.location = !store.location"
            type="button"
            class="mt-[9px] border border-primary rounded-md px-[47px] py-[11px]"
          >
            <Icon icon="weui:location-outlined" class="text-4xl text-primary" />
          </button>
        </div>
      </form>
    </div>
    <Confirm />
    <location />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Confirm from "../components/Confirm.vue";
import location from "../components/location.vue";
import { useStore } from "../store";
import { toast } from "vue3-toastify";
import axios from "axios";
import "vue3-toastify/dist/index.css";

const store = useStore();

console.log("storage item", localStorage.getItem("location"));

const u_data = ref({
  userId: +localStorage.getItem("user_id"),
  from_district: localStorage.getItem("from"),
  to_district: localStorage.getItem("to"),
  date: localStorage.getItem("date"),
  location: localStorage.getItem("location"),
  description: "",
});

const router = useRouter();
const count = ref(1);

const createOrder = async () => {
  try {
    console.log("udata", u_data.value);
    const response = await axios.post(
      "http://95.130.227.176:3015/api/order-taxi",
      u_data.value
    );
    console.log("successful:", response.data);
    toast.success("successfully done!");
    router.push("/passenger-home");
  } catch (error) {
    console.error("Error registering:", error);
    toast("Something went wrong!", {
      theme: "light",
      type: "warning",
      transition: "bounce",
      dangerouslyHTMLString: true,
    });
  } finally {
    store.confirm = !store.confirm;
  }
};

watch(
  () => store.confirm,
  (newValue) => {
    if (newValue) {
      createOrder();
    }
  }
);

const incrementCount = () => {
  if (count.value < 4) {
    count.value++;
  }
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
