<template>
  <div>
    <main
      class="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden"
    >
      <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div class="flex justify-center">
          <div
            class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow"
          >
            <header class="mb-8">
              <h1 class="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
              <p class="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your phone
                number.
              </p>
            </header>
            <form @submit.prevent="handleSubmit">
              <div class="flex items-center justify-center gap-3">
                <input
                  v-for="(digit, index) in digits"
                  ref="input"
                  :key="index"
                  type="text"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  maxlength="1"
                  v-model="digits[index]"
                  @keydown="handleKeyDown($event, index)"
                  @input="handleInput($event, index)"
                  @focus="handleFocus"
                  @paste="handlePaste"
                />
              </div>
              <div class="max-w-[260px] mx-auto mt-4">
                <button
                  ref="submitButton"
                  type="submit"
                  class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary/70 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary/50 transition-colors duration-150"
                >
                  Verify Account
                </button>
              </div>
            </form>
            <div class="text-sm text-slate-500 mt-4">
              <!-- Didn't receive code? -->
              Clear inputs
              <a
                @click="clearAllInputs"
                class="font-medium text-primary/80 hover:text-primary/90"
                href="#0"
                >Resend</a
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const store = useStore();

const router = useRouter();

watch(
  () => store.driver_data,
  (datas) => {
    if (!datas) {
      router.push({ name: "driver_regis" });
    }
  },
  { immediate: true }
);

const digits = ref(Array(4).fill(""));
const submitButton = ref(null);

onMounted(() => {
  submitButton.value = document.querySelector("button[type=submit]");
});

const handleKeyDown = (e, index) => {
  if (
    !/^[0-9]{1}$/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "Tab" &&
    !e.metaKey
  ) {
    e.preventDefault();
  }

  if (e.key === "Delete" || e.key === "Backspace") {
    if (index > 0) {
      digits.value[index - 1] = "";
      document.querySelectorAll("input")[index - 1].focus();
    }
  }
};

const clearAllInputs = () => {
  digits.value = Array(4).fill("");
  document.querySelectorAll("input")[0].focus();
};

const handleInput = (e, index) => {
  if (e.target.value) {
    if (index < digits.value.length - 1) {
      document.querySelectorAll("input")[index + 1].focus();
    } else {
      submitButton.value.focus();
    }
  }
};

const handleFocus = (e) => {
  e.target.select();
};

const handlePaste = (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData("text");
  if (!new RegExp(`^[0-9]{${digits.value.length}}$`).test(text)) {
    return;
  }
  const chars = text.split("");
  chars.forEach((char, i) => (digits.value[i] = char));
  submitButton.value.focus();
};

console.log("pinia", store.driver_data);

const handleSubmit = async () => {
  if (digits.value.join("") == "1111") {
    const today = new Date();
    const isoString = today.toISOString();
    try {
      const response = await axios.post(
        "http://95.130.227.176:3015/api/driver/signup",
        store.driver_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await axios.post("http://95.130.227.176:3015/api/balance", {
        amount: 0.1,
        driverId: response.data.newDriver.id,
        date: isoString,
      });
      console.log("Registration successful:", response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("role", "driver");
      localStorage.setItem("driver_id", response.data.newDriver.id);
      router.push("/driver-profile");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Please try again.");
    }
  }
};
</script>

<style lang="scss" scoped></style>
