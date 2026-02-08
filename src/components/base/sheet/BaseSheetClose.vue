<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { DialogClose, type DialogCloseProps } from 'reka-ui'

import { baseSheetCloseButtonVariation } from './index'

const props = defineProps<DialogCloseProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogClose
    :class="twMerge(baseSheetCloseButtonVariation(), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogClose>
</template>
