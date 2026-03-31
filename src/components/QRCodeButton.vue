<script setup lang="ts">
import {
  BaseDialog,
  BaseDialogTrigger,
  BaseDialogScrollContent,
  BaseDialogHeader,
  BaseDialogTitle,
} from '@/components/base/dialog'
import IconQrCode from '@/components/icons/qr-code.svg'
import { computed } from 'vue'

const props = defineProps<{
  link: string
}>()

const qrCodeUrl = computed(() => {
  if (!props.link) return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(props.link)}`
})
</script>

<template>
  <BaseDialog>
    <BaseDialogTrigger as-child>
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 h-8 w-8 align-middle -mt-1 ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 cursor-pointer"
        title="Показать QR-код"
      >
        <IconQrCode class="w-5 h-5 min-w-5 min-h-5" />
      </button>
    </BaseDialogTrigger>
    <BaseDialogScrollContent class="sm:max-w-md">
      <BaseDialogHeader>
        <BaseDialogTitle>QR код для скачивания</BaseDialogTitle>
      </BaseDialogHeader>
      <div class="flex items-center justify-center p-6 bg-white rounded-xl shadow-inner mt-2 min-h-[250px] min-w-[250px]">
        <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="w-[200px] h-[200px]" />
      </div>
    </BaseDialogScrollContent>
  </BaseDialog>
</template>
