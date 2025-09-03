import { useState } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import ContentInputPage from '@/features/album/components/ContentInputPage';
import {
  useUploadImage,
  useCreateAlbum,
} from '@/features/album/hooks/useAlbumMutations';
import { showSuccess, showError } from '@/lib/toast';

interface PhotoUploadPageProps {
  onBack: () => void;
}

const PhotoUploadPage = ({ onBack }: PhotoUploadPageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'photo' | 'content'>('photo');

  const { mutateAsync: uploadImageAsync, isPending: uploading } =
    useUploadImage();
  const { mutateAsync: createAlbumAsync, isPending: creating } =
    useCreateAlbum();

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

  const handlePhotoConfirm = async () => {
    if (selectedImage) {
      try {
        const response = await uploadImageAsync(selectedImage);

        const imageUrl = response.imgUrl;
        setImagePreview(imageUrl);
        setCurrentStep('content');
      } catch (error) {
        showError('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleContentConfirm = async (text: string) => {
    if (!imagePreview) return;

    try {
      const requestData = {
        imgUrl: imagePreview,
        caption: text,
      };

      await createAlbumAsync(requestData);

      showSuccess('앨범이 성공적으로 등록되었습니다!');
      onBack();
    } catch (error) {
      showError('앨범 등록에 실패했습니다. 다시 시도해 주세요.');
    }
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
        isCreating={creating}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1">
        <div className="!mb-8 px-6">
          <Header onClick={handleClose} />
          <p className="font-hana-bold text-text-primary !mt-2 !mb-0 text-3xl">
            사진<span className="font-hana-regular">을 선택해 주세요</span>
          </p>
        </div>

        <div className="px-6">
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
            {imagePreview ? (
              <div className="relative h-full w-full">
                <img
                  src={imagePreview}
                  alt="선택된 사진"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                  className="bg-accent-primary font-hana-bold absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-sm !text-white shadow-lg"
                  style={{ color: 'white' }}
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="text-line font-hana-bold mb-4 text-6xl">+</div>
                <p className="font-hana-regular text-text-secondary text-lg">
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
          className="!font-hana-bold w-full !py-4 !text-lg"
          onClick={handlePhotoConfirm}
          disabled={!selectedImage || uploading}
        >
          {uploading ? '업로드 중...' : '확인'}
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
