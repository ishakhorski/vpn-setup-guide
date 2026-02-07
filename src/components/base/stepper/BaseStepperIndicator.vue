<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperIndicator, useForwardProps, type StepperIndicatorProps } from 'reka-ui'

import { baseStepperIndicatorVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperIndicatorProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperIndicator must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperIndicator
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      twMerge(
        baseStepperIndicatorVariation({ variant: context.variant.value, size: context.size.value }),
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </StepperIndicator>
</template>
