<script setup lang="ts">
import { computed, provide } from 'vue'
import { reactiveOmit } from '@vueuse/core'

import {
  DialogRoot,
  useForwardPropsEmits,
  type DialogRootEmits,
  type DialogRootProps,
} from 'reka-ui'

import { baseDialogContextKey, type BaseDialogSize } from './index'

const props = defineProps<
  DialogRootProps & {
    size?: BaseDialogSize
  }
>()
const emits = defineEmits<DialogRootEmits>()

const delegatedProps = reactiveOmit(props, 'size')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

provide(baseDialogContextKey, {
  size: computed(() => props.size),
})
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
