<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

import { AccordionItem, useForwardProps, type AccordionItemProps } from "reka-ui";

import {
  baseAccordionItemVariation,
  type BaseAccordionItemVariation,
} from "./index";

const props = defineProps<
  AccordionItemProps & {
    variant?: BaseAccordionItemVariation["variant"];
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = reactiveOmit(props, "variant", "class");
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="twMerge(baseAccordionItemVariation({ variant: props.variant }), props.class)"
  >
    <slot />
  </AccordionItem>
</template>
