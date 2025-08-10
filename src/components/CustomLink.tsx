'use client';

import { ComponentProps } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
// clsx
import clsx from 'clsx';
// I18n
import { Link } from '@/i18n/routing';

export default function CustomLink({
    href,
    ...rest
}: ComponentProps<typeof Link>) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const isActive = pathname === href;

    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
                'inline-block px-2 py-3 transition-colors',
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            )}
            href={href}
            {...rest}
        />
    );
}