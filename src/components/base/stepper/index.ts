import type { ComputedRef, InjectionKey } from "vue";
import { cva, type VariantProps } from "class-variance-authority";

export type BaseStepperVariant = BaseStepperVariation["variant"];
export type BaseStepperSize = "small" | "medium" | "large";

export interface BaseStepperContext {
  variant: ComputedRef<BaseStepperVariant>;
  size: ComputedRef<BaseStepperSize | undefined>;
}

export const baseStepperContextKey: InjectionKey<BaseStepperContext> = Symbol("BaseStepperContext");

export const baseStepperVariation = cva("flex gap-2", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type BaseStepperVariation = VariantProps<typeof baseStepperVariation>;

export const baseStepperItemVariation = cva(
  "flex items-center gap-2 group data-[disabled]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseStepperItemVariation = VariantProps<typeof baseStepperItemVariation>;

export const baseStepperIndicatorVariation = cva(
  "inline-flex items-center justify-center rounded-full text-muted-foreground/60 group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default:
          "group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground",
      },
      size: {
        small: "size-6 min-w-6",
        medium: "size-8 min-w-8",
        large: "size-10 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  },
);
export type BaseStepperIndicatorVariation = VariantProps<typeof baseStepperIndicatorVariation>;

export const baseStepperTriggerVariation = cva(
  "flex flex-col items-center text-center gap-1 rounded-md outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseStepperTriggerVariation = VariantProps<typeof baseStepperTriggerVariation>;

export const baseStepperTitleVariation = cva("font-semibold", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});
export type BaseStepperTitleVariation = VariantProps<typeof baseStepperTitleVariation>;

export const baseStepperDescriptionVariation = cva("text-muted-foreground", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      small: "text-[10px]",
      medium: "text-xs",
      large: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});
export type BaseStepperDescriptionVariation = VariantProps<typeof baseStepperDescriptionVariation>;

export const baseStepperSeparatorVariation = cva(
  "bg-muted group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "group-data-[state=completed]:bg-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BaseStepperSeparatorVariation = VariantProps<typeof baseStepperSeparatorVariation>;

export { default as BaseStepper } from "./BaseStepper.vue";
export { default as BaseStepperDescription } from "./BaseStepperDescription.vue";
export { default as BaseStepperIndicator } from "./BaseStepperIndicator.vue";
export { default as BaseStepperItem } from "./BaseStepperItem.vue";
export { default as BaseStepperSeparator } from "./BaseStepperSeparator.vue";
export { default as BaseStepperTitle } from "./BaseStepperTitle.vue";
export { default as BaseStepperTrigger } from "./BaseStepperTrigger.vue";
