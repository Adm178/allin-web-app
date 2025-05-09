'use client';

import { createContext, useContext } from 'react';

type Dictionary = Record<string, string>;

const TranslationContext = createContext<Dictionary>({});

export function TranslationsProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const dict = useContext(TranslationContext);
  const t = (key: string) => dict[key] || key;
  return { t };
}
