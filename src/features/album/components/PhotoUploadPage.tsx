import { useState } from 'react';
import Button from '@/components/button/Button';
import Header from '@/components/Header';
import ContentInputPage from '@/features/album/components/ContentInputPage';

interface PhotoUploadPageProps {
  onBack: () => void;
}

const PhotoUploadPage = ({ onBack }: PhotoUploadPageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'photo' | 'content'>('photo');

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoConfirm = () => {
    if (selectedImage) {
      console.log('선택된 이미지:', selectedImage);
      setCurrentStep('content');
    }
  };

  const handleContentConfirm = (text: string) => {
    console.log('최종 등록:', { image: selectedImage, text });
    // 여기에 최종 등록 로직 구현
    onBack();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setCurrentStep('photo');
    onBack();
  };

  const handleBackToPhoto = () => {
    setCurrentStep('photo');
  };

  if (currentStep === 'content' && imagePreview) {
    return (
      <ContentInputPage
        imagePreview={imagePreview}
        onBack={handleBackToPhoto}
        onConfirm={handleContentConfirm}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1">
        <div className="px-6 !mb-8">
          <Header onClick={handleClose} />
          <p className="text-3xl font-hana-bold text-text-primary !mt-2 !mb-0">
            사진<span className="font-hana-regular">을 선택해 주세요</span>
          </p>
        </div>

        <div className="px-6">
          <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 overflow-hidden">
            {imagePreview ? (
              <div className="w-full h-full relative">
                <img
                  src={imagePreview}
                  alt="선택된 사진"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-accent-primary !text-white rounded-full flex items-center justify-center text-sm font-hana-bold shadow-lg"
                  style={{ color: 'white' }}
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="text-6xl text-line font-hana-bold mb-4">+</div>
                <p className="text-lg font-hana-regular text-text-secondary">
                  사진을 선택하세요
                </p>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Button
          intent={!selectedImage ? 'disable' : 'green'}
          size="lg"
          className="w-full !py-4 !text-lg !font-hana-bold"
          onClick={handlePhotoConfirm}
          disabled={!selectedImage}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
