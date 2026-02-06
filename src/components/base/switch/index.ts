import { cva, type VariantProps } from "class-variance-authority";

export type BaseSwitchVariant = "primary";
export type BaseSwitchSize = "small" | "medium" | "large";

export const baseSwitchRootVariation = cva(
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "",
      },
      size: {
        small: "h-4 w-7",
        medium: "h-5 w-9",
        large: "h-6 w-11",
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
  "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none inline-flex items-center justify-center size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        primary: "",
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
