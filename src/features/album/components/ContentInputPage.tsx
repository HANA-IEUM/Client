import { useState } from 'react';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import Header from '@/components/Header';

interface ContentInputPageProps {
  imagePreview: string;
  onBack: () => void;
  onConfirm: (text: string) => void;
}

const ContentInputPage = ({
  imagePreview,
  onBack,
  onConfirm,
}: ContentInputPageProps) => {
  const [textContent, setTextContent] = useState('힘내 파이팅!!');
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
    <div className="w-full h-full flex flex-col">
      <div className="flex-1">
        <div className="px-6 !mb-8">
          <Header onClick={onBack} />
          <p className="text-3xl font-hana-bold text-text-primary !mt-2 !mb-0">
            한 줄 내용<span className="font-hana-regular">을 적어주세요</span>
          </p>
        </div>

        <div className="px-6">
          <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8">
            <img
              src={imagePreview}
              alt="선택된 사진"
              className="w-full h-full object-cover"
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
          className="w-full !py-4 !text-lg !font-hana-bold"
          onClick={handleConfirm}
          disabled={!textContent.trim() || isOverLimit}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default ContentInputPage;
