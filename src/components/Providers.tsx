"use client";

import { useEffect, Suspense } from "react";
// Next Themes
import { ThemeProvider, useTheme } from "next-themes";
// Redux
import { Provider } from "react-redux";
import { store } from "@/store/store";
// next intl
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
// toast 
import { CustomToastProvider } from "@/components/CustomToast";
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
      version: '0.1.0',
      origin: window.origin,
      message: 'hello developer!',
      themeColor: "red",
      debug: true,
    };
    logLogo(descriptionLog);
  }, []);

  return (
    <Provider store={store}>
      <NextIntlClientProvider timeZone="Asia/Tehran" messages={messages} locale={locale}>
        <CustomToastProvider />
        <ThemeProvider defaultTheme="light" enableSystem>
          <ThemeLogger />
          <Suspense>
            {children}
          </Suspense>
        </ThemeProvider>
      </NextIntlClientProvider>
    </Provider>
  );
}


function ThemeLogger() {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return null;
}