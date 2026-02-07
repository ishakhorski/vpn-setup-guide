<script setup lang="ts">
import type { Component } from 'vue'

import {
  BaseAccordion,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccordionContent,
} from '@/components/base/accordion'
import { useMarkdownContent } from '@/composables/useMarkdownContent'

const faqs = useMarkdownContent(
  import.meta.glob<{ default: Component; title: string; order: number }>('@/content/faq/*.md', {
    eager: true,
  }),
)
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center gap-5 py-3 md:gap-8">
    <div class="text-center">
      <h2 class="text-xl font-bold tracking-tight md:text-3xl">Часто задаваемые вопросы</h2>
      <p class="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
        Ответы на популярные вопросы о VPN
      </p>
    </div>

    <BaseAccordion type="single" collapsible class="flex w-full flex-col gap-3">
      <BaseAccordionItem v-for="faq in faqs" :key="faq.order" :value="`faq-${faq.order}`">
        <BaseAccordionTrigger>
          {{ faq.title }}
        </BaseAccordionTrigger>
        <BaseAccordionContent class="prose">
          <component :is="faq.component" />
        </BaseAccordionContent>
      </BaseAccordionItem>
    </BaseAccordion>

    <div class="w-full flex justify-center border-t border-border pt-6">
      <RouterLink
        to="/guide"
        class="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        Нужна помощь с настройкой?
        <span class="font-medium underline underline-offset-4">Перейти к руководству</span>
      </RouterLink>
    </div>
  </div>
</template>
