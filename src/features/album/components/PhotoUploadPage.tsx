import { useState } from 'react';
import Button from '@/components/button/Button';
import Header from '@/components/Header';

interface PhotoUploadPageProps {
  onBack: () => void;
}

const PhotoUploadPage = ({ onBack }: PhotoUploadPageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleConfirm = () => {
    if (selectedImage) {
      console.log('선택된 이미지:', selectedImage);
      // 여기에 이미지 업로드 로직 구현
      onBack();
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    onBack();
  };

  return (
    <div className="w-full h-full">
      <div className="px-6 !mb-8">
        <Header onClick={handleClose} />
        <p className="text-3xl font-hana-bold text-text-primary !mt-2 !mb-0">
          사진<span className="font-hana-regular">을 선택해 주세요</span>
        </p>
      </div>

      <div className="px-6 mb-8">
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
            // 이미지가 선택되지 않은 경우
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="text-6xl text-gray-400 font-hana-bold mb-4">
                +
              </div>
              <p className="text-lg font-hana-regular text-text-secondary">
                사진을 선택하세요
              </p>
            </label>
          )}
        </div>
      </div>

      <div className="px-6">
        <Button
          intent="green"
          size="lg"
          className="w-full !mt-30 !py-4 !text-lg !font-hana-bold"
          onClick={handleConfirm}
          disabled={!selectedImage}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
