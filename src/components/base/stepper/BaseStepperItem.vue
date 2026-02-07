<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperItem, useForwardProps, type StepperItemProps } from 'reka-ui'

import { baseStepperItemVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperItemProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperItem must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperItem
    v-slot="slotProps"
    v-bind="forwarded"
    :class="twMerge(baseStepperItemVariation({ variant: context.variant.value }), props.class)"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>
