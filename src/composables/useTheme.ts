import { ref, watch, onMounted, onUnmounted } from "vue";

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};
export type Theme = (typeof THEME)[keyof typeof THEME];

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return THEME.LIGHT;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME.DARK : THEME.LIGHT;
};

const applyTheme = (selectedTheme: Theme) => {
  if (typeof document === "undefined") return;
  document.body.dataset.theme = selectedTheme;
};

const theme = ref<Theme>(getSystemTheme());

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    applyTheme(newTheme);
  };

  const handleSystemChange = (event: MediaQueryListEvent) => {
    theme.value = event.matches ? THEME.DARK : THEME.LIGHT;
  };

  let mediaQuery: MediaQueryList | null = null;

  onMounted(() => {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemChange);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener("change", handleSystemChange);
  });

  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  });

  return {
    theme,
    setTheme,
  };
}
