<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
  type DialogContentEmits,
  type DialogContentProps,
} from 'reka-ui'

import IconClose from '@/components/icons/close.svg'

import BaseSheetOverlay from './BaseSheetOverlay.vue'
import { baseSheetCloseButtonVariation, baseSheetContentVariation } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  DialogContentProps & { class?: HTMLAttributes['class']; showCloseButton?: boolean }
>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'showCloseButton')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <BaseSheetOverlay />
    <DialogContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="twMerge(baseSheetContentVariation(), props.class)"
    >
      <slot />

      <DialogClose v-if="showCloseButton ?? true" :class="baseSheetCloseButtonVariation()">
        <IconClose class="size-5" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
