import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageView } from './components/GeneratedImageView';
import { Button } from './components/Button';
import { generateProfessionalPhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { useI18n } from './hooks/useI18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { StyleSelector } from './components/StyleSelector';
import { OutfitSelector } from './components/OutfitSelector';

export type Pose = 'default' | 'armsCrossed' | 'thinking';
export type Framing = 'chestUp' | 'halfBody' | 'fullBody';
export type Outfit = 'blazer' | 'suit' | 'shirt' | 'turtleneck';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pose, setPose] = useState<Pose>('default');
  const [framing, setFraming] = useState<Framing>('chestUp');
  const [outfit, setOutfit] = useState<Outfit>('blazer');
  const { t } = useI18n();

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64DataUrl = await fileToBase64(originalImage);
      const { base64Data, mimeType } = extractBase64AndMime(base64DataUrl);
      
      const generatedBase64 = await generateProfessionalPhoto(base64Data, mimeType, pose, framing, outfit);
      
      if (generatedBase64) {
        setGeneratedImageUrl(`data:${mimeType};base64,${generatedBase64}`);
      } else {
        throw new Error(t('errorNoImage'));
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, t, pose, framing, outfit]);

  const extractBase64AndMime = (dataUrl: string) => {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) {
      throw new Error('Invalid data URL');
    }
    const mimeType = mimeMatch[1];
    const base64Data = parts[1];
    return { base64Data, mimeType };
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 sm:p-6 lg:p-8 flex flex-col relative">
      <LanguageSwitcher />
      <div className="container mx-auto max-w-6xl flex-grow">
        <Header />
        <main className="mt-8">
          <StyleSelector
            selectedPose={pose}
            onPoseChange={setPose}
            selectedFraming={framing}
            onFramingChange={setFraming}
          />
          <OutfitSelector
            selectedOutfit={outfit}
            onOutfitChange={setOutfit}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-8">
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
            <GeneratedImageView
              imageUrl={generatedImageUrl}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={handleGenerateClick}
              disabled={!originalImage || isLoading}
            >
              {isLoading ? t('generating') : t('generate')}
            </Button>
          </div>
        </main>
      </div>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>{t('poweredBy')}</p>
      </footer>
    </div>
  );
};

export default App;