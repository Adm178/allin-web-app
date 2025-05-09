export const i18nConfig = {
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
} as const;

export type Locale = 'en' | 'ru';