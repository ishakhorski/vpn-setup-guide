<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import ThemeSwitch from "@/components/ThemeSwitch.vue";

const { isDark } = useTheme();
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        class="orb absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-orb-primary blur-[100px]"
        style="animation: orb-float 20s ease-in-out infinite"
      />
      <div
        class="orb absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-orb-secondary blur-[120px]"
        style="animation: orb-float-reverse 25s ease-in-out infinite"
      />
      <div
        class="orb absolute -bottom-32 left-1/3 h-[450px] w-[450px] rounded-full bg-orb-tertiary blur-[110px]"
        style="animation: orb-float 30s ease-in-out infinite"
      />
    </div>

    <header class="glass sticky top-0 z-50">
      <div
        class="container mx-auto flex items-center justify-between px-6 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5"
      >
        <RouterLink
          to="/"
          class="text-xl font-bold tracking-tight md:text-2xl cursor-pointer outline-none rounded-md focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          VLESS VPN
        </RouterLink>
        <ThemeSwitch v-model="isDark" />
      </div>
    </header>

    <main class="container mx-auto flex flex-1 flex-col p-6 md:px-8 lg:px-10">
      <RouterView />
    </main>
  </div>
</template>
