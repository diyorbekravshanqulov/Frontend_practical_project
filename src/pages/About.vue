<template>
  <div class="container py-10 ">
    <p
      class="font-medium text-5xl max-md:text-2xl text-[#313131] mb-20 max-md:mb-[30px] text-center"
    >
      {{ $t("about") }}
    </p>
    <div class="grid md:grid-cols-2 gap-[119px] max-md:gap-8">
      <img src="/about.png" class="w-full" alt="about_image" />
      <p class="md:text-lg">
        {{ $t("about_text") }}
      </p>
    </div>
  </div>
</template>

<script setup></script>
