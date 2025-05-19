'use client';

import React from 'react';
// Iconsax
import { Moon, Sun1 } from 'iconsax-reactjs';
// Next Themes
import { useTheme } from 'next-themes';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
// Next Intl
import { useTranslations } from 'next-intl';

type DarkModeToggleProps = {
  className?: string;
  size?: number;
  showLabel?: boolean;
  icons?: {
    light?: React.ReactNode;
    dark?: React.ReactNode;
  };
};

const DarkModeToggleSwitch = ({
  className = '',
  size = 22,
  showLabel = true,
  icons = {},
}: DarkModeToggleProps): React.JSX.Element => {
  const t = useTranslations('DarkModeSwitcher');
  const lightLabel = t('lightLabel');
  const darkLabel = t('darkLabel');

  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = (): void => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const baseStyles = `flex items-center gap-2 cursor-pointer rounded-lg border px-3 h-12 transition-colors duration-300`;
  const dynamicStyles = isDark
    ? 'border-secondary-300 hover:bg-secondary-100 text-secondary-300'
    : 'border-primary-main hover:bg-primary-light text-primary-main';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`${baseStyles} ${dynamicStyles} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          {isDark
            ? icons.dark ?? <Moon size={size} />
            : icons.light ?? <Sun1 size={size} className="text-primary-main" />}
        </motion.span>
      </AnimatePresence>

      {showLabel && (
        <motion.span
          key={isDark ? 'label-light' : 'label-dark'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="text-sm h-full flex items-center"
        >
          {isDark ? lightLabel : darkLabel}
        </motion.span>
      )}
    </button>
  );
};

export default DarkModeToggleSwitch;
