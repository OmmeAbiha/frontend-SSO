'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter, routing } from '@/i18n/routing';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
// Headlessui
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// Framer Motion
import { motion } from 'framer-motion';
// clsx
import clsx from 'clsx';
// Components
import LoadingBox from './LoadingBox';
// Iconsax
import { ArrowDown2, LanguageSquare } from 'iconsax-reactjs';


export default function LocaleSwitcherMenu() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (menuButtonRef.current) {
                setMenuWidth(menuButtonRef.current.offsetWidth);
            }
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        if (menuButtonRef.current) {
            resizeObserver.observe(menuButtonRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const handleChange = (nextLocale: string) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error: locale routing types
                { pathname, params },
                { locale: nextLocale }
            );
        });
    };

    return (
        <Menu as="div" className="w-full relative inline-block">
            <MenuButton
                ref={menuButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    'w-full flex h-12 items-center gap-2 rounded-lg border border-primary-main transition-colors duration-300 hover:bg-primary-light p-3 text-sm text-primary-main outline-none',
                    isPending && 'pointer-events-none'
                )}
            >
                {
                    isPending ? (
                        <LoadingBox size={40} color='#FDB612' />
                    ) : (
                        <div className='flex w-full h-full gap-2 items-center justify-between'>
                            <div className='flex gap-2'>
                                <LanguageSquare size={20} className="text-primary-main text-base" />
                                <span>{t('label')}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className=""
                            >
                                <ArrowDown2 size={16} />
                            </motion.div>
                        </div>
                    )
                }
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                style={{ width: menuWidth }}
                className="absolute z-50 mt-1 gap-1 flex flex-col rounded-xl bg-background p-1 text-sm shadow-md outline-none border border-primary-main"
            >
                {routing.locales.map((cur) => (
                    <MenuItem key={cur} as="button" onClick={() => handleChange(cur)}
                        className={({ active }) =>
                            clsx(
                                'w-full px-3 h-10 rounded-lg text-primary-dark',
                                cur === locale ? 'bg-primary-main text-white font-bold' : 'hover:bg-primary-veryLight'
                            )
                        }
                    >
                        {t('locale', { locale: cur })}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu >
    );
}
