<script setup lang="ts">
import { computed } from "vue";
import { BaseSwitch } from "@/components/base/switch";
import IconSun from "@/components/icons/sun.svg";
import IconMoon from "@/components/icons/moon.svg";

import { THEME, type Theme } from "@/composables/useTheme";

const props = defineProps<{
  theme: Theme;
}>();

const emit = defineEmits<{
  (e: "update:theme", value: Theme): void;
}>();

const darkMode = computed<boolean>({
  get: () => props.theme === THEME.DARK,
  set: (value: boolean) => {
    emit("update:theme", value ? THEME.DARK : THEME.LIGHT);
  },
});
</script>

<template>
  <BaseSwitch v-model="darkMode" size="large">
    <template #thumb>
      <IconSun v-if="darkMode" class="size-4" />
      <IconMoon v-else class="size-4" />
    </template>
  </BaseSwitch>
</template>
