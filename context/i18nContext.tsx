import React, { createContext, useState, ReactNode } from 'react';
import { en } from '../locales/en';
import { zh } from '../locales/zh';

type Locale = 'en' | 'zh';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, zh };

interface I18nContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: keyof Translations) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Locale>('zh'); // Default to Traditional Chinese

  const t = (key: keyof Translations) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
