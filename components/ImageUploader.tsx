import React, { useRef } from 'react';
import { useI18n } from '../hooks/useI18n';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('uploadTitle')}</h2>
      <div
        className="aspect-square w-full rounded-lg bg-gray-50 flex items-center justify-center cursor-pointer relative overflow-hidden group border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-300"
        onClick={handleAreaClick}
        role="button"
        aria-label={t('uploadCta')}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          className="hidden"
          aria-hidden="true"
        />
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">{t('uploadChange')}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold">{t('uploadCta')}</p>
            <p className="text-sm">{t('uploadHint')}</p>
          </div>
        )}
      </div>
      <div className="mt-6 text-left text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-2">{t('proTipsTitle')}</h3>
        <ul className="space-y-1 list-inside">
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span>{t('tip1')}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span>{t('tip2')}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span>{t('tip3')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};