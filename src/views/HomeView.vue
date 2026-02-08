<script setup lang="ts">
import IconWindows from '@/components/icons/windows.svg'
import IconAndroid from '@/components/icons/android.svg'
import IconApple from '@/components/icons/apple.svg'
import IconMessageQuestionMark from '@/components/icons/message-question-mark.svg'
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center justify-center gap-5 md:gap-6 lg:gap-8">
    <div class="text-center">
      <h2 class="text-xl font-bold tracking-tight md:text-3xl">Добро пожаловать</h2>
      <p class="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
        Выберите платформу для настройки VPN
      </p>
    </div>

    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-5 lg:gap-6">
      <RouterLink
        to="/guide/windows"
        class="glass group flex cursor-pointer items-center gap-4 rounded-2xl p-4 text-card-foreground outline-none transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:glass-hover focus-visible:ring-[3px] focus-visible:ring-ring/50 md:flex-col md:p-6 lg:p-8"
      >
        <div
          class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:size-14 lg:size-18"
        >
          <IconWindows class="size-6 text-primary md:size-7 lg:size-9" />
        </div>
        <div class="md:text-center">
          <span class="text-base font-semibold md:text-lg lg:text-xl">Windows</span>
          <p class="text-xs text-muted-foreground md:mt-1.5 md:text-base">
            v2rayN, Discord, UWP, SwitchyOmega
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/guide/android"
        class="glass group flex cursor-pointer items-center gap-4 rounded-2xl p-4 text-card-foreground outline-none transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:glass-hover focus-visible:ring-[3px] focus-visible:ring-ring/50 md:flex-col md:p-6 lg:p-8"
      >
        <div
          class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:size-14 lg:size-18"
        >
          <IconAndroid class="size-6 text-primary md:size-7 lg:size-9" />
        </div>
        <div class="md:text-center">
          <span class="text-base font-semibold md:text-lg lg:text-xl">Android</span>
          <p class="text-xs text-muted-foreground md:mt-1.5 md:text-base">
            NekoBox, маршрутизация приложений
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/guide/apple"
        class="glass group flex cursor-pointer items-center gap-4 rounded-2xl p-4 text-card-foreground outline-none transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:glass-hover focus-visible:ring-[3px] focus-visible:ring-ring/50 md:flex-col md:p-6 lg:p-8"
      >
        <div
          class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:size-14 lg:size-18"
        >
          <IconApple class="size-6 text-primary md:size-7 lg:size-9" />
        </div>
        <div class="md:text-center">
          <span class="text-base font-semibold md:text-lg lg:text-xl">macOS / iOS</span>
          <p class="text-xs text-muted-foreground md:mt-1.5 md:text-base">
            V2Box для iPhone, iPad, Mac
          </p>
        </div>
      </RouterLink>
    </div>

    <RouterLink
      to="/frequently-asked-questions"
      class="glass group flex w-full max-w-200 cursor-pointer items-center gap-3 rounded-xl p-3 text-muted-foreground outline-none transition-all duration-300 hover:border-primary/20 hover:text-primary hover:glass-hover focus-visible:ring-[3px] focus-visible:ring-ring/50 md:gap-4 md:p-4"
    >
      <div
        class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted-foreground/10 transition-colors duration-300 group-hover:bg-primary/10 md:size-10"
      >
        <IconMessageQuestionMark class="size-4 md:size-5" />
      </div>
      <div>
        <span class="text-sm font-medium md:text-base">Часто задаваемые вопросы</span>
        <p class="text-xs text-muted-foreground md:text-sm">
          Проблемы с установкой и настройкой VPN
        </p>
      </div>
    </RouterLink>
  </div>
</template>
