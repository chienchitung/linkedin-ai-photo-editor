import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const Header: React.FC = () => {
  const { t } = useI18n();
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
        {t('title')}
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        {t('description')}
      </p>
    </header>
  );
};
