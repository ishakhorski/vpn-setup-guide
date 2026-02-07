<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import {
  StepperRoot,
  useForwardPropsEmits,
  type StepperRootEmits,
  type StepperRootProps,
} from 'reka-ui'

import {
  baseStepperVariation,
  baseStepperContextKey,
  type BaseStepperVariation,
  type BaseStepperSize,
} from './index'

const props = defineProps<
  StepperRootProps & {
    variant?: BaseStepperVariation['variant']
    size?: BaseStepperSize
    class?: HTMLAttributes['class']
  }
>()
const emits = defineEmits<StepperRootEmits>()

const delegatedProps = reactiveOmit(props, 'variant', 'size', 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

provide(baseStepperContextKey, {
  variant: computed(() => props.variant),
  size: computed(() => props.size),
})
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="twMerge(baseStepperVariation({ variant: props.variant }), props.class)"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
