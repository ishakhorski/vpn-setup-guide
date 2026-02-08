import { cva, type VariantProps } from 'class-variance-authority'

export const baseDialogOverlayVariation = cva(
  'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out',
)

export const baseDialogContentVariation = cva(
  'fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 glass rounded-2xl p-6 shadow-lg data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out',
  {
    variants: {
      variant: {
        default: 'max-w-[calc(100%-2rem)] sm:max-w-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BaseDialogContentVariation = VariantProps<typeof baseDialogContentVariation>

export const baseDialogScrollOverlayVariation = cva(
  'fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/40 backdrop-blur-sm data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out',
)

export const baseDialogScrollContentVariation = cva(
  'relative z-50 my-4 grid w-full gap-4 glass rounded-2xl p-6 shadow-lg sm:my-8 data-[state=open]:animate-dialog-scroll-content-in data-[state=closed]:animate-dialog-scroll-content-out',
  {
    variants: {
      variant: {
        default: 'max-w-280',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const baseDialogHeaderVariation = cva('flex flex-col gap-1.5 text-center sm:text-left')

export const baseDialogFooterVariation = cva(
  'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
)

export const baseDialogTitleVariation = cva('text-lg font-semibold leading-none tracking-tight')

export const baseDialogDescriptionVariation = cva('text-sm text-muted-foreground')

export const baseDialogCloseButtonVariation = cva(
  'absolute top-4 right-4 rounded-md p-1 opacity-70 outline-none transition-opacity cursor-pointer hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
)

export { default as BaseDialog } from './BaseDialog.vue'
export { default as BaseDialogClose } from './BaseDialogClose.vue'
export { default as BaseDialogContent } from './BaseDialogContent.vue'
export { default as BaseDialogDescription } from './BaseDialogDescription.vue'
export { default as BaseDialogFooter } from './BaseDialogFooter.vue'
export { default as BaseDialogHeader } from './BaseDialogHeader.vue'
export { default as BaseDialogOverlay } from './BaseDialogOverlay.vue'
export { default as BaseDialogScrollContent } from './BaseDialogScrollContent.vue'
export { default as BaseDialogTitle } from './BaseDialogTitle.vue'
export { default as BaseDialogTrigger } from './BaseDialogTrigger.vue'
