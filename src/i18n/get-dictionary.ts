import { Locale } from './i18n-config';

export const getDictionary = async (locale: Locale) => {
  try {
    // Загружаем соответствующий файл перевода
    const dictionary = (await import(`./dictionaries/${locale}.json`)).default;
    return dictionary;
  } catch {
    // Ошибка загружена, но не используется
    console.warn(`Не удалось загрузить словарь для языка ${locale}`);
    return {}; // Возвращаем пустой объект на случай ошибки
  }
};