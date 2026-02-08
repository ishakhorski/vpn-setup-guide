<script setup lang="ts">
import { type Component } from 'vue'

import { BaseButton } from '@/components/base/button'
import {
  BaseDialog,
  BaseDialogTrigger,
  BaseDialogScrollContent,
  BaseDialogHeader,
  BaseDialogTitle,
  BaseDialogDescription,
} from '@/components/base/dialog'
import {
  BaseSheet,
  BaseSheetTrigger,
  BaseSheetContent,
  BaseSheetHeader,
  BaseSheetTitle,
  BaseSheetDescription,
} from '@/components/base/sheet'

import IconInfo from '@/components/icons/info.svg'

const props = defineProps<{
  title: string
  component: Component
}>()
</script>

<template>
  <BaseDialog size="large">
    <BaseDialogTrigger as-child>
      <BaseButton variant="secondary" class="hidden md:flex">
        <span class="hidden md:block">{{ 'Подробнее' }}</span>
        <IconInfo class="size-4" />
      </BaseButton>
    </BaseDialogTrigger>
    <BaseDialogScrollContent>
      <BaseDialogHeader>
        <BaseDialogTitle>
          {{ props.title }}
        </BaseDialogTitle>
        <BaseDialogDescription>
          {{ props.title }}
        </BaseDialogDescription>
      </BaseDialogHeader>
      <div class="prose">
        <component :is="props.component" />
      </div>
    </BaseDialogScrollContent>
  </BaseDialog>

  <BaseSheet>
    <BaseSheetTrigger as-child>
      <BaseButton variant="secondary" class="md:hidden">
        <span class="hidden md:block">{{ 'Подробнее' }}</span>
        <IconInfo class="size-4" />
      </BaseButton>
    </BaseSheetTrigger>
    <BaseSheetContent>
      <BaseSheetHeader>
        <BaseSheetTitle>
          {{ props.title }}
        </BaseSheetTitle>
        <BaseSheetDescription>
          {{ props.title }}
        </BaseSheetDescription>
      </BaseSheetHeader>
      <div class="prose px-6 pb-8">
        <component :is="props.component" />
      </div>
    </BaseSheetContent>
  </BaseSheet>
</template>
