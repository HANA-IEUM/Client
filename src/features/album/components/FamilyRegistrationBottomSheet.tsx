import { useNavigate } from 'react-router-dom';

import familyGroup from '@/assets/album/familyGroup.png';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';

interface FamilyRegistrationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const FamilyRegistrationBottomSheet = ({
  isOpen,
  onClose,
}: FamilyRegistrationBottomSheetProps) => {
  const navigate = useNavigate();

  const handleFamilyRegistration = () => {
    navigate('/family');
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} maxHeight="80vh">
      <div className="mt-8 flex min-h-[675px] flex-col gap-4">
        <div className="font-hana-regular w-full text-3xl">
          <p>
            아직 가족에 속해있지 않아
            <br />
            <span className="font-hana-bold">앨범</span>을 사용할 수 없어요
            <br />
            <span className="font-hana-bold">가족 등록</span>을 먼저해 주세요
          </p>
        </div>

        <div className="my-10 flex w-full items-center justify-center">
          <img src={familyGroup} alt="가족 그룹" width={300} height={300} />
        </div>

        <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
          <Button
            intent="green"
            label="가족등록 하러가기"
            onClick={handleFamilyRegistration}
            className="w-full"
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default FamilyRegistrationBottomSheet;
