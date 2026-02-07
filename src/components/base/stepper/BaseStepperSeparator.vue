<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperSeparator, useForwardProps, type StepperSeparatorProps } from 'reka-ui'

import { baseStepperSeparatorVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperSeparatorProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperSeparator must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="twMerge(baseStepperSeparatorVariation({ variant: context.variant.value }), props.class)"
  />
</template>
