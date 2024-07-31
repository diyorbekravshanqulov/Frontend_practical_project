<template>
  <div
    v-if="isOpen"
    @click="isOpen = !isOpen"
    class="fixed top-0 md:hidden left-0 h-screen bg-white/30 backdrop-blur-sm w-screen z-10"
  ></div>
  <div
    class="sticky top-0 left-0 z-40 w-full bg-primary"
    :class="isScrolled ? 'shadow-md shadow-black/30' : ''"
  >
    <div
      class="container duration-500 py-3.5 flex items-center justify-between w-full"
    >
      <p
        id="taxi"
        @click="router.push('/')"
        class="text-black cursor-pointer md:text-[40px] text-[25px] font-bold"
      >
        T<span class="text-white">a</span>x<span class="text-white">i</span>
      </p>
      <div class="flex gap-[30px] max-md:gap-5 items-center">
        <p
          @click="navigate(index)"
          v-for="(item, index) in 2"
          :key="index"
          class="text-lg max-md:hidden cursor-pointer text-white font-medium"
        >
          {{ index == 0 ? $t("about") : $t("ques") }}
        </p>
        <FlagDropdown @click="isOpen = false" />
        <button
          @click="router.push('/user')"
          v-if="!store.token"
          class="text-lg shadowWhite cursor-pointer max-md:hidden text-white font-medium border px-4 py-1 rounded-md border-gray-300 hover:border-white duration-300 hover:shadow-white"
        >
          {{ $t("login") }}
        </button>
        <div v-else class="relative">
          <Icon
            @click="logout = !logout"
            icon="bxs:user"
            class="text-white cursor-pointer text-4xl"
          />
          <p
            @click="clearStorage()"
            :class="logout ? 'scale-100' : 'scale-0'"
            class="px-3 py-2 rounded-md bg-gray-700 cursor-pointer duration-300 w-[130px] top-full left-1/2 -translate-x-1/2 text-white text-xl absolute"
          >
            Logout
            <Icon
              icon="material-symbols:logout"
              class="text-red-500 ml-3 inline-block text-2xl"
            />
          </p>
        </div>
        <Icon
          @click="isOpen = !isOpen"
          icon="solar:hamburger-menu-broken"
          class="text-white cursor-pointer text-4xl md:hidden"
        />
      </div>
    </div>
  </div>
  <div
    :class="[
      isScrolled ? 'shadow-md shadow-black/30' : '',
      isOpen ? 'scale-100 h-auto' : 'scale-0 h-0 top-7',
    ]"
    class="container bg-primary fixed z-20 duration-300 top-[65.5px] left-0 md:hidden py-10"
  >
    <div class="flex flex-col-reverse items-center gap-5">
      <p
        @click="navigate(index)"
        v-for="(item, index) in 2"
        :key="index"
        :class="index == 0 ? '' : ''"
        class="text-lg cursor-pointer text-white font-medium"
      >
        {{ index == 0 ? $t("about") : $t("ques") }}
      </p>
      <button
        @click="router.push('/user')"
        v-if="!store.token"
        class="text-lg shadowWhite cursor-pointer w-full text-white font-medium border px-4 py-1 rounded-md border-gray-300 hover:border-white duration-300 hover:shadow-white"
      >
        {{ $t("login") }}
      </button>
      <div v-else class="relative">
        <Icon
          @click="logout = !logout"
          icon="bxs:user"
          class="text-white cursor-pointer text-6xl"
        />
        <p
          @click="clearStorage()"
          :class="logout ? 'scale-100' : 'scale-0'"
          class="px-3 py-2 rounded-md bg-gray-700 cursor-pointer duration-300 w-[130px] top-full left-1/2 -translate-x-1/2 text-white text-xl absolute"
        >
          Logout
          <Icon
            icon="material-symbols:logout"
            class="text-red-500 ml-3 inline-block text-2xl"
          />
        </p>
      </div>
    </div>
  </div>
  <div
    v-if="logout"
    @click="logout = !logout"
    class="fixed top-0 left-0 h-screen w-screen z-10"
  ></div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import FlagDropdown from "./FlagDropdown.vue"; // Adjust the path as necessary
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const store = useStore();

const isOpen = ref(false);

const logout = ref(false);

const router = useRouter();

store.token = localStorage.getItem("access_token");

const clearStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  localStorage.removeItem("driver_id");
  store.token = localStorage.getItem("access_token");
  logout.value = !logout.value;
  router.push({ name: "home" });
};

const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const navigate = (index) => {
  if (index == 0) {
    router.push("/about");
  } else if (index == 1) {
    router.push("/FAQ");
  }
};
</script>

<style scoped>
/* Add your styles here */

#taxi,
#taxi span {
  font-family: "Rubik Mono One", monospace;
}
#taxi {
  text-shadow: 0 0px 5px white;
}
#taxi span {
  text-shadow: 0 0px 5px black;
}

.shadowWhite {
  box-shadow: 0 0 3px 0 white;
}

.shadowWhite:hover {
  box-shadow: 0 0 7px 0 white;
}

@media screen and (max-height: 768px) {
  .container {
    padding: 6px 16px;
  }
}

@media screen and (min-width: 769px) {
  .MainNav {
    padding: 14px 16px;
  }
}
</style>
