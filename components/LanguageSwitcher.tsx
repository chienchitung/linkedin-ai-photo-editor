import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        {t('english')}
      </button>
      <button
        onClick={() => setLanguage('zh')}
        aria-pressed={language === 'zh'}
        className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
          language === 'zh'
            ? 'bg-blue-600 text-white shadow'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        {t('chinese')}
      </button>
    </div>
  );
};
