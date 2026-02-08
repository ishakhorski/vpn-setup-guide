<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { DialogOverlay, type DialogOverlayProps } from 'reka-ui'

import { baseSheetOverlayVariation } from './index'

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogOverlay v-bind="delegatedProps" :class="twMerge(baseSheetOverlayVariation(), props.class)">
    <slot />
  </DialogOverlay>
</template>
