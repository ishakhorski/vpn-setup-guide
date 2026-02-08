<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
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

import BaseDialogOverlay from './BaseDialogOverlay.vue'
import {
  baseDialogCloseButtonVariation,
  baseDialogContentVariation,
  baseDialogContextKey,
} from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    DialogContentProps & { class?: HTMLAttributes['class']; showCloseButton?: boolean }
  >(),
  {
    showCloseButton: true,
  },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'showCloseButton')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const context = inject(baseDialogContextKey, undefined)
</script>

<template>
  <DialogPortal>
    <BaseDialogOverlay />
    <DialogContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="twMerge(baseDialogContentVariation({ size: context?.size.value }), props.class)"
    >
      <slot />

      <DialogClose v-if="showCloseButton" :class="baseDialogCloseButtonVariation()">
        <IconClose class="size-5" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
