<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type Component } from "vue";
import { useRouteQuery } from "@vueuse/router";

import { BaseButton } from "@/components/base/button";
import {
  BaseStepper,
  BaseStepperItem,
  BaseStepperTrigger,
  BaseStepperIndicator,
  BaseStepperTitle,
  BaseStepperSeparator,
} from "@/components/base/stepper";

import IconCheck from "@/components/icons/check.svg";
import IconArrowRight from "@/components/icons/arrow-right.svg";

interface GuideModule {
  default: Component;
  title: string;
  description: string;
  order: number;
}

const modules = import.meta.glob<GuideModule>("@/content/guide/*.md", {
  eager: true,
});

const steps = Object.values(modules)
  .map((mod) => ({
    title: mod.title,
    description: mod.description,
    order: mod.order,
    component: mod.default,
  }))
  .sort((a, b) => a.order - b.order);

const currentStep = useRouteQuery("step", "1", { transform: Number, mode: "replace" });
const totalSteps = steps.length;
const isFirstStep = computed(() => currentStep.value === 1);
const isLastStep = computed(() => currentStep.value === totalSteps);
const isDone = computed(() => currentStep.value > totalSteps);
const activeStep = computed(() => steps[currentStep.value - 1]);
const progress = computed(() =>
  isDone.value ? 100 : ((currentStep.value - 1) / totalSteps) * 100,
);

function nextStep() {
  if (currentStep.value <= totalSteps) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--;
}

const stepperScrollRef = ref<HTMLElement | null>(null);

function scrollToActiveStep(smooth = true) {
  const container = stepperScrollRef.value;
  if (!container) return;
  const activeEl = container.querySelector<HTMLElement>("[data-state=active]");
  if (!activeEl) return;
  const target = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
  container.scrollTo({ left: target, behavior: smooth ? "smooth" : "instant" });
}

watch(currentStep, async () => {
  await nextTick();
  scrollToActiveStep();
});

onMounted(async () => {
  await nextTick();
  scrollToActiveStep(false);
});
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center gap-5 py-3 md:gap-8 md:py-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold tracking-tight md:text-4xl">Быстрая настройка</h2>
      <p class="mt-1 text-sm text-muted-foreground md:mt-2 md:text-lg">
        Пошаговое руководство по настройке VPN
      </p>
    </div>

    <div class="flex w-full flex-col gap-4 md:gap-8">
      <!-- Scrollable stepper -->
      <div class="relative">
        <div ref="stepperScrollRef" class="stepper-scroll overflow-x-auto">
          <BaseStepper
            v-model="currentStep"
            :linear="false"
            class="flex min-w-max items-center px-[calc(50%-1rem)] md:px-[calc(50%-3rem)]"
          >
            <template v-for="(step, index) in steps" :key="step.order">
              <BaseStepperItem
                :step="step.order"
                :class="index < steps.length - 1 ? 'flex-1' : 'flex-shrink-0'"
              >
                <template #default="{ state }">
                  <BaseStepperTrigger
                    class="max-w-24 cursor-pointer transition-opacity duration-200 md:max-w-28"
                    :class="[
                      state === 'active'
                        ? 'opacity-100'
                        : state === 'completed'
                          ? 'opacity-100'
                          : 'opacity-40 hover:opacity-70',
                    ]"
                  >
                    <BaseStepperIndicator
                      :class="
                        state === 'active'
                          ? 'ring-[3px] ring-primary/30'
                          : state === 'completed'
                            ? 'ring-[3px] ring-accent/30'
                            : ''
                      "
                    >
                      <IconCheck v-if="state === 'completed'" class="size-4" />
                      <span v-else>{{ step.order }}</span>
                    </BaseStepperIndicator>
                    <BaseStepperTitle class="hidden md:block">
                      {{ step.title }}
                    </BaseStepperTitle>
                  </BaseStepperTrigger>
                  <BaseStepperSeparator
                    v-if="index < steps.length - 1"
                    class="mx-2 h-0.5 min-w-6 flex-1 rounded-full md:min-w-10 lg:mx-3"
                  />
                </template>
              </BaseStepperItem>
            </template>
          </BaseStepper>
        </div>
      </div>

      <!-- Step counter -->
      <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>{{ isDone ? "Готово!" : `Шаг ${currentStep} из ${totalSteps}` }}</span>
        <span class="font-medium text-primary">{{ Math.round(progress) }}%</span>
      </div>

      <!-- Done state -->
      <div v-if="isDone" class="glass overflow-hidden rounded-2xl">
        <div class="flex flex-col items-center gap-4 p-8 text-center md:p-12">
          <div
            class="flex size-16 items-center justify-center rounded-full bg-primary/10 md:size-20"
          >
            <IconCheck class="size-8 text-primary md:size-10" />
          </div>
          <div>
            <h3 class="text-xl font-bold md:text-2xl">Настройка завершена!</h3>
            <p class="mt-1 text-muted-foreground">Все шаги выполнены. VPN готов к использованию.</p>
          </div>
          <BaseButton variant="secondary" class="mt-2" @click="currentStep = 1">
            Пройти заново
          </BaseButton>
        </div>
      </div>

      <!-- Content card + navigation -->
      <template v-else>
        <div class="glass overflow-hidden rounded-2xl">
          <div class="border-b border-glass-border px-5 py-3 md:px-8 md:py-4">
            <h3 class="text-lg font-semibold md:text-xl">{{ activeStep?.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ activeStep?.description }}</p>
          </div>
          <div class="p-5 md:p-8">
            <template v-for="step in steps" :key="step.order">
              <div v-show="step.order === currentStep" class="prose">
                <component :is="step.component" />
              </div>
            </template>
          </div>
        </div>

        <!-- Step navigation -->
        <div class="flex items-center justify-between">
          <BaseButton
            variant="secondary"
            size="medium"
            :disabled="isFirstStep"
            class="gap-1.5"
            @click="prevStep()"
          >
            <IconArrowRight class="size-4 rotate-180" />
            <span class="hidden sm:inline">Назад</span>
          </BaseButton>

          <span class="text-sm text-muted-foreground"> {{ currentStep }} / {{ totalSteps }} </span>

          <BaseButton size="medium" class="gap-1.5" @click="nextStep()">
            <span class="hidden sm:inline">
              {{ isLastStep ? "Завершить" : "Далее" }}
            </span>
            <IconCheck v-if="isLastStep" class="size-4" />
            <IconArrowRight v-else class="size-4" />
          </BaseButton>
        </div>
      </template>

      <!-- FAQ link (always visible) -->
      <div class="flex justify-center border-t border-border pt-6">
        <RouterLink
          to="/frequently-asked-questions"
          class="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Остались вопросы?
          <span class="font-medium underline underline-offset-4">Перейти к FAQ</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-scroll {
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  scrollbar-width: none;
}

.stepper-scroll::-webkit-scrollbar {
  display: none;
}
</style>
