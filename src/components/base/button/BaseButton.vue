<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

import { Primitive, useForwardProps, type PrimitiveProps } from "reka-ui";

import { baseButtonVariation, type BaseButtonVariation } from "./index";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: BaseButtonVariation["variant"];
      size?: BaseButtonVariation["size"];
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    as: "button",
    variant: "primary",
    size: "medium",
  },
);

const delegatedProps = reactiveOmit(props, "variant", "size", "class");
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="twMerge(baseButtonVariation({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot></slot>
  </Primitive>
</template>
