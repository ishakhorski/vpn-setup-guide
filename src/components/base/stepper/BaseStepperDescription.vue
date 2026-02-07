<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperDescription, useForwardProps, type StepperDescriptionProps } from 'reka-ui'

import { baseStepperDescriptionVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperDescriptionProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperDescription must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperDescription
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      twMerge(
        baseStepperDescriptionVariation({
          variant: context.variant.value,
          size: context.size.value,
        }),
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>
