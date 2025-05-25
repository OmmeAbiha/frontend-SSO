'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import LoadingBox from './LoadingBox';
import { ArrowDown2, LanguageSquare } from 'iconsax-reactjs';

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function LocaleSwitcherMenu() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleChange = (nextLocale: string) => {
    setOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error: locale routing types
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          'w-full flex h-12 items-center gap-2 rounded-lg border border-primary-main transition-colors duration-300 hover:bg-primary-light p-3 text-sm text-primary-main outline-none',
          isPending && 'pointer-events-none'
        )}
        aria-label="Toggle locale dropdown"
      >
        {isPending ? (
          <LoadingBox size={35} color="#FDB612" />
        ) : (
          <div className="flex w-full h-full gap-2 items-center justify-between">
            <div className="flex gap-2">
              <LanguageSquare size={20} className="text-primary-main text-base" />
              <span>{t('label')}</span>
            </div>
            <ArrowDown2 size={16} className={`${open ? "rotate-180" : ""} transition-all duration-300`} />
          </div>
        )}
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
            className="absolute left-0 right-0 z-50 mt-2 flex flex-col rounded-lg bg-background text-sm shadow-md outline-none border border-primary-main overflow-hidden"
          >
            {routing.locales.map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => handleChange(cur)}
                className={clsx(
                  'w-full px-3 h-10 text-primary-dark flex items-center justify-between gap-2 transition-colors',
                  cur === locale
                    ? 'bg-primary-main text-white font-bold'
                    : 'hover:bg-primary-veryLight'
                )}
                aria-current={cur === locale}
              >
                <span>{t('locale', { locale: cur })}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
