import { watch } from "vue";
import { useLocalStorage } from "@vueuse/core";

const getSystemDark = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const isDark = useLocalStorage<boolean>("dark-mode", getSystemDark());

const applyTheme = (dark: boolean) => {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("dark", dark);
};

export function useTheme() {
  watch(
    isDark,
    (dark) => {
      applyTheme(dark);
    },
    { immediate: true },
  );

  return { isDark };
}
