<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { Primitive, useForwardProps, type PrimitiveProps } from 'reka-ui'

import { baseBadgeVariation, type BaseBadgeVariation } from './index'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: BaseBadgeVariation['variant']
      size?: BaseBadgeVariation['size']
      class?: HTMLAttributes['class']
    }
  >(),
  {
    as: 'span',
    variant: 'secondary',
    size: 'medium',
  },
)

const delegatedProps = reactiveOmit(props, 'variant', 'size', 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="twMerge(baseBadgeVariation({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot></slot>
  </Primitive>
</template>
