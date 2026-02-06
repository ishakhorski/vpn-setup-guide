<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from "reka-ui";

import IconChevronUp from "@/components/icons/chevron-up.svg";

import {
  baseAccordionTriggerVariation,
  type BaseAccordionTriggerVariation,
} from "./index";

const props = defineProps<
  AccordionTriggerProps & {
    variant?: BaseAccordionTriggerVariation["variant"];
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = reactiveOmit(props, "variant", "class");
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        twMerge(baseAccordionTriggerVariation({ variant: props.variant }), props.class)
      "
    >
      <slot />
      <slot name="icon">
        <IconChevronUp
          class="pointer-events-none size-4 shrink-0 translate-y-0.5 rotate-180 text-muted-foreground transition-transform duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
