import { cva, type VariantProps } from 'class-variance-authority'

export const baseSheetOverlayVariation = cva(
  'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-sheet-overlay-in data-[state=closed]:animate-sheet-overlay-out',
)

export const baseSheetContentVariation = cva(
  'fixed z-50 flex flex-col gap-4 glass rounded-t-2xl p-6 shadow-lg transition ease-in-out inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BaseSheetContentVariation = VariantProps<typeof baseSheetContentVariation>

export const baseSheetHeaderVariation = cva('flex flex-col gap-1.5 px-6 pt-6')

export const baseSheetFooterVariation = cva('mt-auto flex flex-col gap-2 px-6 pb-6')

export const baseSheetTitleVariation = cva('text-lg font-semibold leading-none tracking-tight')

export const baseSheetDescriptionVariation = cva('text-sm text-muted-foreground')

export const baseSheetCloseButtonVariation = cva(
  'absolute top-4 right-4 rounded-md p-1 opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
)

export { default as BaseSheet } from './BaseSheet.vue'
export { default as BaseSheetClose } from './BaseSheetClose.vue'
export { default as BaseSheetContent } from './BaseSheetContent.vue'
export { default as BaseSheetDescription } from './BaseSheetDescription.vue'
export { default as BaseSheetFooter } from './BaseSheetFooter.vue'
export { default as BaseSheetHeader } from './BaseSheetHeader.vue'
export { default as BaseSheetOverlay } from './BaseSheetOverlay.vue'
export { default as BaseSheetTitle } from './BaseSheetTitle.vue'
export { default as BaseSheetTrigger } from './BaseSheetTrigger.vue'
