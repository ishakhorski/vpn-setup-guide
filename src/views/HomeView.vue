<script setup lang="ts">
import IconRocket from '@/components/icons/rocket.svg'
import IconMessageQuestionMark from '@/components/icons/message-question-mark.svg'
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center justify-center gap-10">
    <div class="text-center">
      <h2 class="text-xl font-bold tracking-tight md:text-3xl">Добро пожаловать</h2>
      <p class="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
        Выберите раздел для начала работы
      </p>
    </div>

    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
      <RouterLink
        to="/guide"
        class="glass group flex cursor-pointer flex-col items-center gap-4 rounded-2xl p-8 text-card-foreground transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-xl md:p-10"
      >
        <div
          class="flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:size-20"
        >
          <IconRocket class="size-8 text-primary md:size-10" />
        </div>
        <div class="text-center">
          <span class="text-xl font-semibold md:text-2xl"> Быстрая настройка </span>
          <p class="mt-1.5 text-sm text-muted-foreground md:text-base">
            Пошаговое руководство по настройке VPN
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/frequently-asked-questions"
        class="glass group flex cursor-pointer flex-col items-center gap-4 rounded-2xl p-8 text-card-foreground transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:shadow-xl md:p-10"
      >
        <div
          class="flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:size-20"
        >
          <IconMessageQuestionMark class="size-8 text-primary md:size-10" />
        </div>
        <div class="text-center">
          <span class="text-xl font-semibold md:text-2xl"> Часто задаваемые вопросы </span>
          <p class="mt-1.5 text-sm text-muted-foreground md:text-base">
            Ответы на популярные вопросы о VPN
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
