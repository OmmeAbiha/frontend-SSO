import { ReactNode } from 'react';
import { Metadata } from "next"
// Fonts
import iranYekanFontNum from "@/src/fonts/iranYekanFontNum";
import iranYekanFont from "@/src/fonts/iranYekanFont";
// Next Intl
import { getMessages } from 'next-intl/server';
// Wrapper Component
import Providers from './Providers';

type Props = {
  children: ReactNode;
  locale: string;
};

export const metadata: Metadata = {
  title: "Omme Abiha",
  description: "توضیحات اپلیکیشن",
  icons: {
    apple: "/common/logo/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();
  const isEnglish = locale === 'en';

  return (
    <html
      className="h-full"
      lang={locale}
      dir={locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Omme Abiha" />
      </head>
      <body
        className={`
      ${iranYekanFont.variable} 
      ${iranYekanFontNum.variable}
      ${isEnglish ? 'font-IranYekanFont' : 'font-IranYekanFontNum'} 
       antialiased 
      `}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}