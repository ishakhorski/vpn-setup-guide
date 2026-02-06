import { cva, type VariantProps } from "class-variance-authority";

export const baseAccordionItemVariation = cva(
  "glass rounded-xl transition-all duration-300 hover:shadow-lg data-[state=open]:shadow-lg data-[state=open]:border-primary/20",
  {
    variants: {
      variant: {
        default: "border-glass-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseAccordionItemVariation = VariantProps<typeof baseAccordionItemVariation>;

export const baseAccordionTriggerVariation = cva(
  "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-medium outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "hover:bg-glass-highlight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseAccordionTriggerVariation = VariantProps<typeof baseAccordionTriggerVariation>;

export const baseAccordionContentVariation = cva(
  "overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      variant: {
        default: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseAccordionContentVariation = VariantProps<typeof baseAccordionContentVariation>;

export const baseAccordionContentInnerVariation = cva("px-5 pt-0 pb-5");

export { default as BaseAccordion } from "./BaseAccordion.vue";
export { default as BaseAccordionContent } from "./BaseAccordionContent.vue";
export { default as BaseAccordionItem } from "./BaseAccordionItem.vue";
export { default as BaseAccordionTrigger } from "./BaseAccordionTrigger.vue";
