import { useState } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import Input from '@/components/input/Input';

interface ContentInputPageProps {
  imagePreview: string;
  onBack: () => void;
  onConfirm: (text: string) => void;
  isCreating?: boolean;
}

const ContentInputPage = ({
  imagePreview,
  onBack,
  onConfirm,
  isCreating = false,
}: ContentInputPageProps) => {
  const [textContent, setTextContent] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextContent(value);

    if (value.length > 30) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  };

  const handleConfirm = () => {
    if (textContent.trim() && !isOverLimit) {
      onConfirm(textContent);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1">
        <div className="!mb-8 px-6">
          <Header onClick={onBack} />
          <p className="font-hana-bold text-text-primary !mt-2 !mb-0 text-3xl">
            한 줄 내용<span className="font-hana-regular">을 적어주세요</span>
          </p>
        </div>

        <div className="px-6">
          <div className="mb-8 aspect-square w-full overflow-hidden rounded-2xl">
            <img
              src={imagePreview}
              alt="선택된 사진"
              className="h-full w-full object-cover"
            />
          </div>

          <Input
            value={textContent}
            onChange={handleTextChange}
            placeholder="30자 이내로 입력해 주세요"
            maxLength={30}
            intent={isOverLimit ? 'red' : 'green'}
            font="regular"
            error={isOverLimit ? '30자를 초과했습니다.' : undefined}
          />

          <div className="mt-2 text-right">
            <span
              className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-text-secondary'}`}
            >
              {textContent.length}/30
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Button
          intent={!textContent.trim() || isOverLimit ? 'disable' : 'green'}
          size="lg"
          className="!font-hana-bold w-full !py-4 !text-lg"
          onClick={handleConfirm}
          disabled={!textContent.trim() || isOverLimit || isCreating}
        >
          {isCreating ? '등록 중...' : '확인'}
        </Button>
      </div>
    </div>
  );
};

export default ContentInputPage;
