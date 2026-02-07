import { cva, type VariantProps } from 'class-variance-authority'

export const baseButtonVariation = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'text-primary-foreground bg-primary hover:bg-primary/90',
        secondary: 'text-secondary-foreground bg-secondary hover:bg-secondary/80',
      },
      size: {
        small: 'h-8 gap-1.5 px-3 rounded-md has-[>svg]:px-2.5',
        medium: 'h-9 px-4 py-2 rounded-md has-[>svg]:px-3',
        large: 'h-10 px-6 rounded-md has-[>svg]:px-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)
export type BaseButtonVariation = VariantProps<typeof baseButtonVariation>

export { default as BaseButton } from './BaseButton.vue'
