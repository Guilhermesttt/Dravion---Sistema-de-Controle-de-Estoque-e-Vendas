"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * @typedef {Object} ThemeProviderProps
 * @extends {React.ComponentProps<typeof NextThemesProvider>}
 */
/**
 * Provides theme context to the application, enabling dark mode toggling and theme persistence.
 * @param {ThemeProviderProps} props
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
