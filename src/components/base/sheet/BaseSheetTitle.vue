<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

import { DialogTitle, type DialogTitleProps } from 'reka-ui'

import { baseSheetTitleVariation } from './index'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogTitle :class="twMerge(baseSheetTitleVariation(), props.class)" v-bind="delegatedProps">
    <slot />
  </DialogTitle>
</template>
