<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { AccordionContent, type AccordionContentProps } from 'reka-ui'

import {
  baseAccordionContentVariation,
  baseAccordionContentInnerVariation,
  baseAccordionContextKey,
} from './index'

const props = defineProps<
  AccordionContentProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(baseAccordionContextKey)

if (!context) {
  throw new Error('BaseAccordionContent must be used within a BaseAccordion')
}

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    :class="
      baseAccordionContentVariation({ variant: context.variant.value, size: context.size.value })
    "
  >
    <div
      :class="
        twMerge(baseAccordionContentInnerVariation({ size: context.size.value }), props.class)
      "
    >
      <slot />
    </div>
  </AccordionContent>
</template>
