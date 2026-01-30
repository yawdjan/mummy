import { useMemo } from 'react';
import theme from './theme.css';

/**
 * Custom hook to access theme values
 * 
 * Usage:
 * const { colors, typography, getColor, getSpacing } = useTheme();
 * 
 * // Direct access
 * const wineColor = colors.wine[800];
 * 
 * // Helper functions
 * const bgColor = getColor('wine', 800);
 * const padding = getSpacing(4);
 */
export function useTheme() {
  const helpers = useMemo(() => ({
    // Get a specific color
    getColor: (colorName, shade) => {
      if (shade !== undefined && theme.colors[colorName]?.[shade]) {
        return theme.colors[colorName][shade];
      }
      return theme.colors[colorName] || colorName;
    },

    // Get spacing value
    getSpacing: (size) => {
      return theme.spacing[size] || `${size}px`;
    },

    // Get font family
    getFontFamily: (type) => {
      return theme.typography.fontFamily[type] || theme.typography.fontFamily.body;
    },

    // Get font size
    getFontSize: (size) => {
      return theme.typography.fontSize[size] || theme.typography.fontSize.base;
    },

    // Get shadow
    getShadow: (size) => {
      return theme.shadows[size] || theme.shadows.base;
    },

    // Get border radius
    getBorderRadius: (size) => {
      return theme.borderRadius[size] || theme.borderRadius.base;
    },

    // Get breakpoint
    getBreakpoint: (size) => {
      return theme.breakpoints[size];
    },

    // Media query helper
    mediaQuery: (breakpoint, type = 'min') => {
      const bp = theme.breakpoints[breakpoint];
      return `@media (${type}-width: ${bp})`;
    },
  }), []);

  return {
    ...theme,
    ...helpers,
  };
}