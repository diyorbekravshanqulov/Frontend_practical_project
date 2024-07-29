<script setup>
import { reactive } from "vue";

const Accordion = (i) => {
  data[i].show = !data[i].show;
};

const data = reactive([
  {
    title: "How do I book a taxi or delivery service?",
    more: "Booking a taxi or delivery service is easy! Simply visit our website or mobile app, enter your pickup location, destination, and desired time, and choose your vehicle type or delivery options. Confirm your booking, and you're all set!",
    show: false,
  },
  {
    title: "What types of vehicles are available?",
    more: "We offer a variety of vehicles to suit your needs, including sedans, SUVs, vans, and trucks for deliveries. You can select the vehicle type that best fits your requirements when booking.",
    show: false,
  },
  {
    title: "How can I track my taxi or delivery order?",
    more: "Once your booking is confirmed, you'll receive a confirmation with details and a tracking link. You can use this link to monitor the status and location of your taxi or delivery in real-time.",
    show: false,
  },
  {
    title: "Are your drivers licensed and insured?",
    more: "Yes, all our drivers are licensed professionals with extensive training and experience. Our vehicles are fully insured to ensure your safety and peace of mind.",
    show: false,
  },
  {
    title: "What payment methods do you accept?",
    more: "We accept various payment methods, including credit/debit cards, mobile wallets, and cash. You can choose your preferred payment option when booking.",
    show: false,
  },
]);
</script>

<template>
  <div
    class="container py-10 md:grid grid-cols-5 gap-[25px]"
  >
    <div class="col-span-2">
      <h2
        class="text-blackBlue leading-[64px] max-md:leading-[40px] max-md:text-center text-3xl md:text-5xl font-semibold"
      >
        {{ $t("faq") }}
      </h2>
    </div>
    <div class="col-span-3 flex flex-wrap gap-2 max-md:mt-4">
      <div
        v-for="(item, index) in data"
        :key="index"
        @click="Accordion(index)"
        class="w-full cursor-pointer flex flex-wrap border border-b-gray-300 items-center justify-between p-4 md:p-6"
      >
        <div class="items-center max-md:w-[90%] flex gap-4 md:gap-[58px]">
          <h6 class="text-primary text-2xl">0{{ index + 1 }}</h6>
          <h6>{{ item.title }}</h6>
        </div>
        <span
          :class="!item.show ? 'rotate-0' : 'rotate-45'"
          class="duration-300 ease-linear"
          ><svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              d="M18.36 10.908H11.088V18.36H7.272V10.908H0V7.452H7.272V0H11.088V7.452H18.36V10.908Z"
              fill="#282938"
            />
          </svg>
        </span>
        <div
          :class="item.show ? 'max-h-[150px]' : 'max-h-0'"
          class="overflow-hidden duration-300 ease-linear"
        >
          <p
            class="text-blackBlue md:text-lg max-md:text-justify max-md:ml-10 font-medium my-8 md:px-[80px]"
          >
            {{ item.more }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
