<script setup lang="ts">
import type { Component } from "vue";

import {
  BaseAccordion,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccordionContent,
} from "@/components/base/accordion";

interface FaqModule {
  default: Component;
  title: string;
  order: number;
}

const modules = import.meta.glob<FaqModule>("@/content/faq/*.md", {
  eager: true,
});

const faqs = Object.values(modules)
  .map((mod) => ({
    title: mod.title,
    order: mod.order,
    component: mod.default,
  }))
  .sort((a, b) => a.order - b.order);
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center gap-10 py-6">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Часто задаваемые вопросы</h2>
      <p class="mt-2 text-base text-muted-foreground md:text-lg">
        Ответы на популярные вопросы о VPN
      </p>
    </div>

    <BaseAccordion type="single" collapsible class="flex w-full max-w-200 flex-col gap-3">
      <BaseAccordionItem v-for="faq in faqs" :key="faq.order" :value="`faq-${faq.order}`">
        <BaseAccordionTrigger>
          {{ faq.title }}
        </BaseAccordionTrigger>
        <BaseAccordionContent class="prose">
          <component :is="faq.component" />
        </BaseAccordionContent>
      </BaseAccordionItem>
    </BaseAccordion>
  </div>
</template>
