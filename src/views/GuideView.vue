<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRoute } from "vue-router";
import { useRouteQuery } from "@vueuse/router";

import GuideModule from "@/components/GuideModule.vue";
import { useMarkdownContent } from "@/composables/useMarkdownContent";

enum Platform {
  Windows = "windows",
  Android = "android",
  Apple = "apple",
}

type MarkdownModule = {
  default: Component;
  title: string;
  description: string;
  order: number;
};

const guidesMap: Record<string, Record<string, MarkdownModule>> = {
  [Platform.Windows]: import.meta.glob<MarkdownModule>("@/content/guides/windows/*.md", {
    eager: true,
  }),
  [Platform.Android]: import.meta.glob<MarkdownModule>("@/content/guides/android/*.md", {
    eager: true,
  }),
  [Platform.Apple]: import.meta.glob<MarkdownModule>("@/content/guides/apple/*.md", {
    eager: true,
  }),
};

const platformTitles: Record<string, string> = {
  [Platform.Windows]: "Windows",
  [Platform.Android]: "Android",
  [Platform.Apple]: "macOS / iOS",
};

const route = useRoute();
const platform = computed(() => route.params.platform as Platform);
const steps = computed(() => useMarkdownContent(guidesMap[platform.value] ?? {}));
const platformTitle = computed(() => platformTitles[platform.value] ?? platform.value);

const currentStep = useRouteQuery("step", "1", { transform: Number, mode: "replace" });
</script>

<template>
  <div
    class="flex w-full max-h-[calc(100dvh-6.5rem)] min-h-160 flex-1 flex-col items-center gap-3 py-2 md:max-h-[calc(100dvh-7.5rem)] md:gap-4 md:py-3 lg:gap-6"
  >
    <GuideModule
      v-model="currentStep"
      :steps="steps"
      :title="`Настройка для ${platformTitle}`"
      description="Пошаговое руководство по настройке VPN"
    />

    <!-- FAQ link (always visible) -->
    <div class="flex justify-center border-t border-border pt-3 md:pt-4 lg:pt-6">
      <RouterLink
        to="/frequently-asked-questions"
        class="text-xs text-muted-foreground rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
      >
        Остались вопросы?
        <span class="font-medium underline underline-offset-4">Перейти к вопросам на ответы</span>
      </RouterLink>
    </div>
  </div>
</template>
