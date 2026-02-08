<script setup lang="ts">
import { type Component } from 'vue'
import { useRouteQuery } from '@vueuse/router'

import {
  BaseAccordion,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccordionContent,
} from '@/components/base/accordion'
import { BaseBadge } from '@/components/base/badge'
import { useMarkdownContent } from '@/composables/useMarkdownContent'

const faqs = useMarkdownContent(
  import.meta.glob<{ default: Component; title: string; order: number; tags: string[] }>(
    '@/content/faq/*.md',
    { eager: true },
  ),
)

const currentFaq = useRouteQuery<string | undefined>('faq', undefined, { mode: 'replace' })
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center gap-4 py-3 md:gap-6 lg:gap-8">
    <div class="w-full">
      <h2 class="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
        Часто задаваемые вопросы
      </h2>
      <p class="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
        Ответы на популярные вопросы о VPN
      </p>
    </div>

    <BaseAccordion
      v-model="currentFaq"
      type="single"
      collapsible
      class="flex w-full flex-col gap-3"
    >
      <BaseAccordionItem v-for="faq in faqs" :key="faq.order" :value="faq.order.toString()">
        <BaseAccordionTrigger>
          <span>
            {{ faq.title }}
            <BaseBadge
              v-for="tag in faq.tags"
              :key="tag"
              variant="outline"
              size="small"
              class="ml-1.5 align-middle"
            >
              {{ tag }}
            </BaseBadge>
          </span>
        </BaseAccordionTrigger>
        <BaseAccordionContent class="prose">
          <component :is="faq.component" />
        </BaseAccordionContent>
      </BaseAccordionItem>
    </BaseAccordion>

    <div class="w-full flex justify-center border-t border-border pt-6">
      <RouterLink
        to="/"
        class="text-sm text-muted-foreground rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        Нужна помощь с настройкой?
        <span class="font-medium underline underline-offset-4">Перейти к руководствам</span>
      </RouterLink>
    </div>
  </div>
</template>
