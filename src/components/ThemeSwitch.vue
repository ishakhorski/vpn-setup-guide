<script setup lang="ts">
import { BaseSwitch } from '@/components/base/switch'
import IconSun from '@/components/icons/sun.svg'
import IconMoon from '@/components/icons/moon.svg'

const isDark = defineModel<boolean>({ required: true })
</script>

<template>
  <BaseSwitch v-model="isDark" size="large" aria-label="Переключить тему">
    <template #thumb>
      <IconMoon v-if="isDark" class="size-4" />
      <IconSun v-else class="size-4" />
    </template>
  </BaseSwitch>
</template>
