<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { AccordionItem, useForwardProps, type AccordionItemProps } from 'reka-ui'

import { baseAccordionItemVariation, baseAccordionContextKey } from './index'

const props = defineProps<
  AccordionItemProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseAccordionContextKey)

if (!context) {
  throw new Error('BaseAccordionItem must be used within a BaseAccordion')
}

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="
      twMerge(
        baseAccordionItemVariation({ variant: context.variant.value, size: context.size.value }),
        props.class,
      )
    "
  >
    <slot />
  </AccordionItem>
</template>
