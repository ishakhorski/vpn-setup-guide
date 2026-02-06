<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

import {
  SwitchRoot,
  SwitchThumb,
  useForwardPropsEmits,
  type SwitchRootProps,
  type SwitchRootEmits,
} from "reka-ui";

import {
  baseSwitchRootVariation,
  baseSwitchThumbVariation,
  type BaseSwitchVariant,
  type BaseSwitchSize,
} from "./index";

const props = defineProps<
  SwitchRootProps & {
    variant?: BaseSwitchVariant;
    size?: BaseSwitchSize;
    class?: HTMLAttributes["class"];
  }
>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = reactiveOmit(props, "variant", "size", "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      twMerge(baseSwitchRootVariation({ variant: props.variant, size: props.size }), props.class)
    "
  >
    <SwitchThumb
      :class="twMerge(baseSwitchThumbVariation({ variant: props.variant, size: props.size }))"
    >
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
