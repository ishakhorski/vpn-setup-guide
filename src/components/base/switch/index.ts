import { cva, type VariantProps } from "class-variance-authority";

export type BaseSwitchVariant = "primary";
export type BaseSwitchSize = "small" | "medium" | "large";

export const baseSwitchRootVariation = cva(
  "peer inline-flex shrink-0 items-center border border-transparent rounded-full outline-none shadow-xs transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
      },
      size: {
        small: "h-4 w-8",
        medium: "h-5 w-9",
        large: "h-6 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);
export type BaseSwitchRootVariation = VariantProps<typeof baseSwitchRootVariation>;

export const baseSwitchThumbVariation = cva(
  "pointer-events-none inline-flex items-center justify-center rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        primary:
          "text-foreground bg-background dark:text-background dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
      },
      size: {
        small: "size-3",
        medium: "size-4",
        large: "size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);
export type BaseSwitchThumbVariation = VariantProps<typeof baseSwitchThumbVariation>;

export { default as BaseSwitch } from "./BaseSwitch.vue";
