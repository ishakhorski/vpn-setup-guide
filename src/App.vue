<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import ThemeSwitch from "@/components/ThemeSwitch.vue";

const { theme, setTheme } = useTheme();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="container flex items-center justify-between px-8 py-6 md:px-10 md:py-8 lg:px-12 lg:py-10 mx-auto"
    >
      <h1 class="text-2xl font-semibold">VLESS VPN</h1>
      <ThemeSwitch :theme="theme" @update:theme="setTheme" />
    </header>
    <main class="container flex-1 p-2 md:p-4 lg:p-6 mx-auto">
      <RouterView />
    </main>
  </div>
</template>
