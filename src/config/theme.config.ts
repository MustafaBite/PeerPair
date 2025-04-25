import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tema tipleri
export type Theme = 'light' | 'dark';

// Tema renk paletleri
export const themeColors = {
  light: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  dark: {
    primary: {
      50: '#0c4a6e',
      100: '#075985',
      200: '#0369a1',
      300: '#0284c7',
      400: '#0ea5e9',
      500: '#38bdf8',
      600: '#7dd3fc',
      700: '#bae6fd',
      800: '#e0f2fe',
      900: '#f0f9ff',
    },
    gray: {
      50: '#111827',
      100: '#1f2937',
      200: '#374151',
      300: '#4b5563',
      400: '#6b7280',
      500: '#9ca3af',
      600: '#d1d5db',
      700: '#e5e7eb',
      800: '#f3f4f6',
      900: '#f9fafb',
    },
  },
};

// Tema geçiş süreleri
export const themeTransitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
  },
};

// Tema animasyonları
export const themeAnimations = {
  fadeIn: {
    keyframes: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    duration: '0.5s',
    timing: 'ease-in-out',
  },
  slideUp: {
    keyframes: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    duration: '0.5s',
    timing: 'ease-out',
  },
};

// Tema sınıf birleştirme yardımcısı
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tema değişkenleri
export const themeVariables = {
  light: {
    '--foreground-rgb': '0, 0, 0',
    '--background-start-rgb': '214, 219, 220',
    '--background-end-rgb': '255, 255, 255',
  },
  dark: {
    '--foreground-rgb': '255, 255, 255',
    '--background-start-rgb': '0, 0, 0',
    '--background-end-rgb': '0, 0, 0',
  },
};

// Tema kuralları
export const themeRules = {
  // Tema değişikliği sırasında uygulanacak kurallar
  transitions: {
    // Tüm geçişler için varsayılan süre ve zamanlama
    default: {
      duration: themeTransitions.duration.normal,
      timing: themeTransitions.timing.ease,
    },
    // Özel geçişler
    colors: {
      duration: themeTransitions.duration.normal,
      timing: themeTransitions.timing.ease,
      properties: ['background-color', 'color', 'border-color'],
    },
    opacity: {
      duration: themeTransitions.duration.fast,
      timing: themeTransitions.timing.ease,
      properties: ['opacity'],
    },
  },
  // Tema değişikliği sırasında korunacak özellikler
  preserve: [
    'transform',
    'transition',
    'animation',
  ],
  // Tema değişikliği sırasında yeniden hesaplanacak özellikler
  recalculate: [
    'width',
    'height',
    'margin',
    'padding',
  ],
}; 