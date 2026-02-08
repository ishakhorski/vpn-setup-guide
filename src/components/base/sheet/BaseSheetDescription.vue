<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { DialogDescription, type DialogDescriptionProps } from 'reka-ui'

import { baseSheetDescriptionVariation } from './index'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogDescription
    :class="twMerge(baseSheetDescriptionVariation(), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogDescription>
</template>
