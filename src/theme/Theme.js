/**
 * Theme Configuration
 * Obituary Site - Floral Memorial Theme
 * 
 * A warm, elegant theme featuring wine, green, gold, black, and white
 * Designed to honor and celebrate life with grace and beauty
 */

const theme = {
  // ==========================================
  // COLOR PALETTE
  // ==========================================
  colors: {
    // Primary - Wine (Deep burgundy tones)
    wine: {
      50: '#fdf2f4',
      100: '#fce7eb',
      200: '#f9d0d9',
      300: '#f4a9ba',
      400: '#ec7a96',
      500: '#e04d73',
      600: '#c92d5b',
      700: '#a8224a',
      800: '#722042',  // Main wine color
      900: '#5c1d38',
      950: '#3a0a1f',
    },

    // Secondary - Green (Soft sage and forest tones)
    green: {
      50: '#f4f9f4',
      100: '#e6f2e6',
      200: '#cee5ce',
      300: '#a6d0a6',
      400: '#76b576',
      500: '#4d944d',
      600: '#3d7a3d',
      700: '#335f33',  // Main green color
      800: '#2c4d2c',
      900: '#264026',
      950: '#112211',
    },

    // Accent - Gold (Warm, elegant gold tones)
    gold: {
      50: '#fdfbf3',
      100: '#fcf7e3',
      200: '#f8ecc0',
      300: '#f3dc93',
      400: '#ecc85e',
      500: '#d4a835',  // Main gold color
      600: '#b8892a',
      700: '#996824',
      800: '#7d5323',
      900: '#684521',
      950: '#3b230f',
    },

    // Neutrals - Black & White spectrum
    black: '#1a1a1a',
    white: '#ffffff',
    
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic colors
    background: {
      primary: '#ffffff',
      secondary: '#fafaf8',
      tertiary: '#f5f3f0',
      dark: '#1a1a1a',
      wine: '#fdf2f4',
      sage: '#f4f9f4',
    },

    text: {
      primary: '#1a1a1a',
      secondary: '#525252',
      muted: '#737373',
      inverse: '#ffffff',
      wine: '#722042',
      gold: '#996824',
    },

    border: {
      light: '#e5e5e5',
      medium: '#d4d4d4',
      dark: '#a3a3a3',
      wine: '#f4a9ba',
      gold: '#f3dc93',
    },
  },

  // ==========================================
  // TYPOGRAPHY
  // ==========================================
  typography: {
    fontFamily: {
      // Elegant serif for headings
      heading: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
      // Clean sans-serif for body text
      body: '"Lato", "Open Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      // Decorative script for accents
      accent: '"Great Vibes", "Dancing Script", cursive',
    },

    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // ==========================================
  // SPACING
  // ==========================================
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
  },

  // ==========================================
  // BORDERS & RADIUS
  // ==========================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },

  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    8: '8px',
  },

  // ==========================================
  // SHADOWS
  // ==========================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    // Themed shadows
    wine: '0 4px 14px 0 rgba(114, 32, 66, 0.15)',
    gold: '0 4px 14px 0 rgba(212, 168, 53, 0.2)',
  },

  // ==========================================
  // TRANSITIONS
  // ==========================================
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
    },
    // Pre-defined transitions
    default: 'all 300ms ease',
    colors: 'background-color 300ms ease, border-color 300ms ease, color 300ms ease',
    transform: 'transform 300ms ease',
    opacity: 'opacity 300ms ease',
  },

  // ==========================================
  // BREAKPOINTS
  // ==========================================
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ==========================================
  // Z-INDEX
  // ==========================================
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // ==========================================
  // CONTAINER
  // ==========================================
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
    '2xl': '1400px',
  },
};

export default theme;