<script lang="ts" setup>
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { StepperTitle, useForwardProps, type StepperTitleProps } from 'reka-ui'

import { baseStepperTitleVariation, baseStepperContextKey } from './index'

const props = defineProps<
  StepperTitleProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseStepperContextKey)

if (!context) {
  throw new Error('BaseStepperTitle must be used within a BaseStepper')
}

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle
    v-bind="forwarded"
    :class="
      twMerge(
        baseStepperTitleVariation({ variant: context.variant.value, size: context.size.value }),
        props.class,
      )
    "
  >
    <slot />
  </StepperTitle>
</template>
