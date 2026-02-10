<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type Component } from 'vue'

import { BaseButton } from '@/components/base/button'

import IconCheck from '@/components/icons/check.svg'
import IconArrowRight from '@/components/icons/arrow-right.svg'

import GuideModuleStepper from '@/components/GuideModuleStepper.vue'
import GuideModuleDialog from '@/components/GuideModuleDialog.vue'

export interface GuideStep {
  component: Component
  title: string
  description: string
  order: number
  extraComponent?: Component
  extraTitle?: string
  extraDescription?: string
}

const props = defineProps<{
  steps: GuideStep[]
  title?: string
  description?: string
}>()

const currentStep = defineModel<number>({ required: true })

const totalSteps = computed(() => props.steps.length)
const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === totalSteps.value)
const isDone = computed(() => currentStep.value > totalSteps.value)
const activeStep = computed(() => props.steps[currentStep.value - 1])
const progress = computed(() =>
  isDone.value ? 100 : ((currentStep.value - 1) / totalSteps.value) * 100,
)

const slideForward = ref(true)

function nextStep() {
  if (currentStep.value <= totalSteps.value) {
    slideForward.value = true
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    slideForward.value = false
    currentStep.value--
  }
}

watch(currentStep, (newVal, oldVal) => {
  slideForward.value = newVal > oldVal
})

const stepperScrollRef = ref<HTMLElement | null>(null)
const contentScrollRef = ref<HTMLElement | null>(null)

function scrollToActiveStep(smooth = true) {
  const container = stepperScrollRef.value
  if (!container) return
  const trigger = container.querySelector<HTMLElement>('[data-state=active] button')
  if (!trigger) return
  const containerRect = container.getBoundingClientRect()
  const triggerRect = trigger.getBoundingClientRect()
  const offset =
    triggerRect.left + triggerRect.width / 2 - containerRect.left - containerRect.width / 2
  container.scrollTo({
    left: container.scrollLeft + offset,
    behavior: smooth ? 'smooth' : 'instant',
  })
}

watch(currentStep, async () => {
  await nextTick()
  scrollToActiveStep()
  if (contentScrollRef.value) {
    contentScrollRef.value.scrollTop = 0
  }
})

onMounted(async () => {
  await nextTick()
  scrollToActiveStep(false)
})
</script>

<template>
  <div class="flex w-full min-h-0 flex-1 flex-col gap-3 md:gap-4 lg:gap-6">
    <!-- Scrollable stepper -->
    <div class="relative flex items-center">
      <div v-if="props.title || props.description">
        <h2
          v-if="props.title"
          class="text-base font-bold whitespace-nowrap tracking-tight md:text-xl lg:text-2xl"
        >
          {{ props.title }}
        </h2>
        <p
          v-if="props.description"
          class="mt-0.5 text-xs text-muted-foreground md:mt-1 md:text-sm lg:mt-2 lg:text-base"
        >
          {{ props.description }}
        </p>
      </div>

      <div ref="stepperScrollRef" class="stepper-scroll overflow-x-auto">
        <GuideModuleStepper v-model="currentStep" :steps="props.steps" />
      </div>
    </div>

    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      :enter-from-class="slideForward ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'"
      enter-to-class="translate-x-0 opacity-100"
      :leave-to-class="slideForward ? '-translate-x-4 opacity-0' : 'translate-x-4 opacity-0'"
      leave-from-class="translate-x-0 opacity-100"
    >
      <!-- Done state -->
      <div v-if="isDone" key="done" class="flex flex-col gap-3 md:gap-4 lg:gap-6">
        <div class="glass overflow-hidden rounded-2xl">
          <div class="flex flex-col items-center gap-4 p-6 text-center md:p-8 lg:p-10">
            <div
              class="flex size-16 items-center justify-center rounded-full bg-primary/10 md:size-20"
            >
              <IconCheck class="size-8 text-primary md:size-10" />
            </div>
            <div>
              <h3 class="text-xl font-bold md:text-2xl">Настройка завершена!</h3>
              <p class="mt-1 text-muted-foreground">
                Все шаги выполнены. VPN готов к использованию.
              </p>
            </div>
            <BaseButton variant="secondary" size="large" class="mt-2" @click="currentStep = 1">
              Пройти заново
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Content card + navigation -->
      <div v-else key="steps" class="flex min-h-0 flex-1 flex-col gap-3 md:gap-4 lg:gap-6">
        <div class="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
          <div
            class="flex items-start justify-between border-b border-glass-border px-5 py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4"
          >
            <div>
              <h3 class="text-lg font-semibold md:text-xl">{{ activeStep?.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ activeStep?.description }}</p>
            </div>

            <GuideModuleDialog
              v-if="activeStep?.extraComponent"
              :title="activeStep?.extraTitle ?? 'Дополнительная информация'"
              :description="activeStep?.extraDescription ?? ''"
              :component="activeStep.extraComponent"
            />
          </div>
          <div
            ref="contentScrollRef"
            class="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-5 md:p-6 lg:p-8"
          >
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-200 ease-out"
              leave-active-class="transition-all duration-150 ease-in"
              :enter-from-class="
                slideForward ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'
              "
              enter-to-class="translate-x-0 opacity-100"
              :leave-to-class="
                slideForward ? '-translate-x-4 opacity-0' : 'translate-x-4 opacity-0'
              "
              leave-from-class="translate-x-0 opacity-100"
            >
              <div :key="currentStep" class="prose">
                <component :is="activeStep?.component" />
              </div>
            </Transition>
          </div>
        </div>

        <!-- Step navigation -->
        <div class="relative flex items-center justify-between">
          <BaseButton
            variant="secondary"
            size="large"
            :disabled="isFirstStep"
            class="gap-1.5"
            @click="prevStep()"
          >
            <IconArrowRight class="size-4 rotate-180" />
            <span class="hidden sm:inline">Назад</span>
          </BaseButton>

          <div
            class="absolute inset-x-0 top-1/2 mx-auto flex w-32 -translate-y-1/2 flex-col items-center gap-1 sm:w-40 md:w-48"
          >
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted md:h-2">
              <div
                class="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                :style="{ width: `${progress}%` }"
              />
            </div>
            <span class="text-xs tabular-nums text-muted-foreground">
              {{ currentStep }}/{{ totalSteps }}
            </span>
          </div>

          <BaseButton size="large" class="gap-1.5" @click="nextStep()">
            <span class="hidden sm:inline">
              {{ isLastStep ? 'Завершить' : 'Далее' }}
            </span>
            <IconCheck v-if="isLastStep" class="size-4" />
            <IconArrowRight v-else class="size-4" />
          </BaseButton>
        </div>
      </div>
    </Transition>
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
