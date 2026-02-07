<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperTrigger, useForwardProps, type StepperTriggerProps } from 'reka-ui'

import { baseStepperTriggerVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperTriggerProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperTrigger must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTrigger
    v-bind="forwarded"
    :class="twMerge(baseStepperTriggerVariation({ variant: context.variant.value }), props.class)"
  >
    <slot />
  </StepperTrigger>
</template>
