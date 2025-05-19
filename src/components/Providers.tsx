"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";
// next intl
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
// toast 
import { Toaster } from 'react-hot-toast';
// logo logger
import { logLogo } from "../functions/logLogo";

// Define the type for messages
export type Messages = Record<string, string | AbstractIntlMessages>;

interface ProvidersProps {
  children: React.ReactNode;
  messages: Messages;
  locale: string;
}

export default function Providers({ children, messages, locale }: ProvidersProps) {
  // Log the OmmeAbiha logo on component mount
  useEffect(() => {
    const descriptionLog = {
      version: '1.0.0',
      origin: window.origin,
      massage: 'hello developer!'
    };
    logLogo(descriptionLog);
  }, []);

  return (
    <Provider store={store}>
      <NextIntlClientProvider timeZone="Asia/Tehran" messages={messages} locale={locale}>
        <Toaster />
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </Provider>
  );
}