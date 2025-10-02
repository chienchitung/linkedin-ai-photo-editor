import React from 'react';
import { Spinner } from './Spinner';
import { useI18n } from '../hooks/useI18n';

interface GeneratedImageViewProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export const GeneratedImageView: React.FC<GeneratedImageViewProps> = ({ imageUrl, isLoading, error }) => {
  const { t } = useI18n();
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('generatedTitle')}</h2>
      <div className="aspect-square w-full rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden border-2 border-dashed border-gray-300">
        {isLoading && <Spinner />}
        {error && !isLoading && (
          <div className="text-red-600 p-4">
            <h3 className="font-bold text-lg">{t('generationFailed')}</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {imageUrl && !isLoading && !error && (
          <>
            <img src={imageUrl} alt="Generated" className="w-full h-full object-cover" />
            <a
              href={imageUrl}
              download="professional-profile-photo.png"
              className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm shadow-md"
            >
              {t('download')}
            </a>
          </>
        )}
        {!imageUrl && !isLoading && !error && (
          <div className="text-gray-500">
            <p>{t('generatedPlaceholder')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
