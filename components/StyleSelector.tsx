import React from 'react';
import { useI18n } from '../hooks/useI18n';
import type { Pose, Framing } from '../App';
// FIX: Import `en` to use its type for translation keys.
import { en } from '../locales/en';

interface StyleSelectorProps {
  selectedPose: Pose;
  onPoseChange: (pose: Pose) => void;
  selectedFraming: Framing;
  onFramingChange: (framing: Framing) => void;
}

interface StyleOption<T> {
  key: T;
  // FIX: Correctly type the labelKey to be a key of the translation object.
  labelKey: keyof typeof en;
}

const poseOptions: StyleOption<Pose>[] = [
  { key: 'default', labelKey: 'poseDefault' },
  { key: 'armsCrossed', labelKey: 'poseArmsCrossed' },
  { key: 'thinking', labelKey: 'poseThinking' },
];

const framingOptions: StyleOption<Framing>[] = [
  { key: 'chestUp', labelKey: 'framingChestUp' },
  { key: 'halfBody', labelKey: 'framingHalfBody' },
  { key: 'fullBody', labelKey: 'framingFullBody' },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedPose,
  onPoseChange,
  selectedFraming,
  onFramingChange,
}) => {
  const { t } = useI18n();

  const renderOptions = <T extends string>(
    options: StyleOption<T>[],
    selectedValue: T,
    onChange: (value: T) => void
  ) => {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            aria-pressed={selectedValue === option.key}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 border ${
              selectedValue === option.key
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            {/* FIX: Removed 'as any' as the type is now correct. */}
            {t(option.labelKey)}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-left shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('styleTitle')}</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('poseTitle')}</h3>
          {renderOptions(poseOptions, selectedPose, onPoseChange)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('framingTitle')}</h3>
          {renderOptions(framingOptions, selectedFraming, onFramingChange)}
        </div>
      </div>
    </div>
  );
};
