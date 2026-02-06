<script setup lang="ts">
import { BaseButton } from "@/components/base/button";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
    <RouterLink to="/guide" custom v-slot="{ navigate, href }">
      <div class="flex flex-col items-center shadow rounded-md cursor-pointer" @click="navigate">
        <BaseButton as="a" :href="href" size="large"> Быстрая настройка </BaseButton>
      </div>
    </RouterLink>
    <RouterLink to="/frequently-asked-questions" custom v-slot="{ navigate, href }">
      <div class="flex flex-col items-center shadow rounded-md cursor-pointer" @click="navigate">
        <BaseButton as="a" :href="href" size="large"> Часто задаваемые вопросы </BaseButton>
      </div>
    </RouterLink>
  </div>
</template>
