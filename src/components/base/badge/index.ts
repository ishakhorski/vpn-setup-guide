import { cva, type VariantProps } from 'class-variance-authority'

export const baseBadgeVariation = cva(
  'inline-flex items-center rounded-full border font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        primary:
          'border-primary/20 bg-primary/10 text-primary',
        secondary:
          'border-border bg-secondary text-secondary-foreground',
        outline:
          'border-border text-muted-foreground',
      },
      size: {
        small: 'px-2 py-0.5 text-[10px] leading-tight',
        medium: 'px-2.5 py-0.5 text-xs',
        large: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
    },
  },
)
export type BaseBadgeVariation = VariantProps<typeof baseBadgeVariation>

export { default as BaseBadge } from './BaseBadge.vue'
