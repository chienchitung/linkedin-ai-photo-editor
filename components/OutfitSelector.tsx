import React from 'react';
import { useI18n } from '../hooks/useI18n';
import type { Outfit } from '../App';
import { en } from '../locales/en';

interface OutfitSelectorProps {
  selectedOutfit: Outfit;
  onOutfitChange: (outfit: Outfit) => void;
}

interface StyleOption<T> {
  key: T;
  labelKey: keyof typeof en;
}

const outfitOptions: StyleOption<Outfit>[] = [
  { key: 'blazer', labelKey: 'outfitBlazer' },
  { key: 'suit', labelKey: 'outfitSuit' },
  { key: 'shirt', labelKey: 'outfitShirt' },
  { key: 'turtleneck', labelKey: 'outfitTurtleneck' },
];

export const OutfitSelector: React.FC<OutfitSelectorProps> = ({
  selectedOutfit,
  onOutfitChange,
}) => {
  const { t } = useI18n();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-left shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('outfitTitle')}</h2>
      <div className="flex flex-wrap gap-2">
        {outfitOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onOutfitChange(option.key)}
            aria-pressed={selectedOutfit === option.key}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 border ${
              selectedOutfit === option.key
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            {t(option.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
};