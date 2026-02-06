<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

import { AccordionContent, type AccordionContentProps } from "reka-ui";

import {
  baseAccordionContentVariation,
  baseAccordionContentInnerVariation,
  type BaseAccordionContentVariation,
} from "./index";

const props = defineProps<
  AccordionContentProps & {
    variant?: BaseAccordionContentVariation["variant"];
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = reactiveOmit(props, "variant", "class");
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    :class="baseAccordionContentVariation({ variant: props.variant })"
  >
    <div :class="twMerge(baseAccordionContentInnerVariation(), props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
