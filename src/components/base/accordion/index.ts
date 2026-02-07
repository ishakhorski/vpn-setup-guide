import type { ComputedRef, InjectionKey } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

export type BaseAccordionVariant = BaseAccordionItemVariation['variant']
export type BaseAccordionSize = 'small' | 'medium' | 'large'

export interface BaseAccordionContext {
  variant: ComputedRef<BaseAccordionVariant>
  size: ComputedRef<BaseAccordionSize | undefined>
}

export const baseAccordionContextKey: InjectionKey<BaseAccordionContext> =
  Symbol('BaseAccordionContext')

export const baseAccordionItemVariation = cva(
  'glass rounded-xl transition-all duration-300 hover:shadow-lg data-[state=open]:shadow-lg data-[state=open]:border-primary/20',
  {
    variants: {
      variant: {
        default: 'border-glass-border',
      },
      size: {
        small: '',
        medium: '',
        large: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
)
export type BaseAccordionItemVariation = VariantProps<typeof baseAccordionItemVariation>

export const baseAccordionTriggerVariation = cva(
  'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-xl text-left font-medium outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      variant: {
        default: 'hover:bg-glass-highlight',
      },
      size: {
        small: 'px-4 py-3 text-sm',
        medium: 'px-5 py-4 text-base',
        large: 'px-6 py-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
)
export type BaseAccordionTriggerVariation = VariantProps<typeof baseAccordionTriggerVariation>

export const baseAccordionContentVariation = cva(
  'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: 'text-foreground',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
)
export type BaseAccordionContentVariation = VariantProps<typeof baseAccordionContentVariation>

export const baseAccordionContentInnerVariation = cva('', {
  variants: {
    size: {
      small: 'px-4 pt-0 pb-4',
      medium: 'px-5 pt-0 pb-5',
      large: 'px-6 pt-0 pb-6',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export { default as BaseAccordion } from './BaseAccordion.vue'
export { default as BaseAccordionContent } from './BaseAccordionContent.vue'
export { default as BaseAccordionItem } from './BaseAccordionItem.vue'
export { default as BaseAccordionTrigger } from './BaseAccordionTrigger.vue'
