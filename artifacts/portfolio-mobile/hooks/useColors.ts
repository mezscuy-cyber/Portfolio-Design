import { useTheme } from "@/contexts/ThemeContext";
import colors from "@/constants/colors";

/**
 * Returns the design tokens for the current theme mode.
 *
 * Reads isDark from ThemeContext (persisted to AsyncStorage) rather than the
 * device color scheme, so the in-app toggle controls the palette.
 */
export function useColors() {
  const { isDark } = useTheme();
  const palette = isDark ? colors.dark : colors.light;
  return { ...palette, radius: colors.radius };
}
