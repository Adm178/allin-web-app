'use client';

import { ReactNode } from 'react';
import SessionProvider from './SessionProvider';
import { ThemeProvider } from './ThemeProvider';
import { TranslationsProvider } from './TranslationsProvider';

export function Providers({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: Record<string, string>;
}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TranslationsProvider dictionary={dictionary}>
          {children}
        </TranslationsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
