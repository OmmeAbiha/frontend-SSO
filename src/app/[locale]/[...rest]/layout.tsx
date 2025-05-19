import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';

type Props = {
  children?: ReactNode
  params: Promise<{ locale: string }>
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title')
  };
}

interface ProductPageProps {
  params: Promise<{ locale: string }>;
  children?: ReactNode; // تعریف children به عنوان یک پراپ اختیاری
}

export default async function LocaleLayout({ children, params }: ProductPageProps) {
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </>
  );
}
