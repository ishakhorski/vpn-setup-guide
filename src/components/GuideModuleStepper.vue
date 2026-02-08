<script setup lang="ts">
import {
  BaseStepper,
  BaseStepperItem,
  BaseStepperTrigger,
  BaseStepperIndicator,
  BaseStepperTitle,
  BaseStepperSeparator,
} from '@/components/base/stepper'

const props = defineProps<{
  steps: {
    title: string
    order: number
  }[]
}>()

const currentStep = defineModel<number>({ required: true })
</script>

<template>
  <BaseStepper
    v-model="currentStep"
    :linear="false"
    class="flex min-w-max items-center px-[calc(50%-1rem)] md:px-[calc(50%-3rem)]"
  >
    <template v-for="(step, index) in props.steps" :key="step.order">
      <BaseStepperItem
        :step="step.order"
        :class="index < steps.length - 1 ? 'flex-1' : 'flex-shrink-0'"
      >
        <template #default="{ state }">
          <BaseStepperTrigger
            class="flex-row gap-2 max-w-28 cursor-pointer transition-opacity duration-200 md:max-w-36"
            :class="[
              state === 'active'
                ? 'opacity-100'
                : state === 'completed'
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-80',
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
            <BaseStepperTitle class="hidden md:block text-left">
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
</template>
