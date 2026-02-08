<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'

import { baseSheetFooterVariation } from './index'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="twMerge(baseSheetFooterVariation(), props.class)">
    <slot />
  </div>
</template>
