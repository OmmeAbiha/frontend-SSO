'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Moon, Sun1, Monitor, ArrowDown2 } from 'iconsax-reactjs';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type DarkModeToggleProps = {
  className?: string;
  size?: number;
  showLabel?: boolean;
  icons?: {
    light?: React.ReactNode;
    dark?: React.ReactNode;
    system?: React.ReactNode;
  };
};

const themeOrder: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];

const themeIcons = {
  light: (size: number, icons: any) => icons?.light ?? <Sun1 size={size} />,
  dark: (size: number, icons: any) => icons?.dark ?? <Moon size={size} />,
  system: (size: number, icons: any) => icons?.system ?? <Monitor size={size} />,
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const DarkModeToggleSwitch = ({
  className = '',
  size = 20,
  showLabel = true,
  icons = {},
}: DarkModeToggleProps): React.ReactElement | null => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open]);

  const t = useTranslations('DarkModeSwitcher');
  const labels = {
    light: t('lightLabel'),
    dark: t('darkLabel'),
    system: t('systemLabel'),
  };

  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!mounted) return null;

  const handleToggleDropdown = () => setOpen((v) => !v);

  const handleSelectTheme = (selected: 'light' | 'dark' | 'system') => {
    setTheme(selected);
    setOpen(false);
  };

  const baseStyles =
    'relative flex items-center justify-between gap-1 cursor-pointer rounded-lg border px-3 h-12 transition-colors duration-300 bg-background';
  const dynamicStyles =
    resolvedTheme === 'dark'
      ? 'border-secondary-300 hover:bg-secondary-100 text-secondary-300'
      : 'border-primary-main hover:bg-primary-light text-primary-main';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        aria-label="Toggle theme dropdown"
        className={`${baseStyles} ${dynamicStyles} w-full`}
      >
        <div className='flex items-center gap-2'>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              {themeIcons[theme as 'light' | 'dark' | 'system']?.(size, icons)}
            </motion.span>
          </AnimatePresence>
          {showLabel && (
            <span className="text-sm h-full flex items-center">{labels[theme as 'light' | 'dark' | 'system']}</span>
          )}
        </div>
        <ArrowDown2 size={16} className={`${open ? "rotate-180" : ""} transition-all duration-300`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-50 mt-2 rounded-lg border border-primary-main bg-background shadow-md overflow-hidden"
          >
            {themeOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelectTheme(item)}
                className={`flex items-center gap-2 w-full px-3 h-10 text-sm transition-colors text-primary-main
                  ${theme === item ? 'bg-primary-main text-background' : 'hover:bg-primary-veryLight'}
                `}
                aria-current={theme === item}
              >
                {themeIcons[item](size, icons)}
                <span className=''>{labels[item]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DarkModeToggleSwitch;