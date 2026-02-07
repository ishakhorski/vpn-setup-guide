<script setup lang="ts">
import { computed, provide } from 'vue'
import { reactiveOmit } from '@vueuse/core'

import {
  AccordionRoot,
  useForwardPropsEmits,
  type AccordionRootEmits,
  type AccordionRootProps,
} from 'reka-ui'

import { baseAccordionContextKey, type BaseAccordionVariant, type BaseAccordionSize } from './index'

const props = defineProps<
  AccordionRootProps & {
    variant?: BaseAccordionVariant
    size?: BaseAccordionSize
  }
>()
const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'variant', 'size')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

provide(baseAccordionContextKey, {
  variant: computed(() => props.variant),
  size: computed(() => props.size),
})
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
