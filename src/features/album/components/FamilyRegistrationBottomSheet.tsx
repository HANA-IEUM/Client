import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import familyGroup from '@/assets/album/familyGroup.png';

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
      <div className="flex flex-col gap-4 mt-8 min-h-[675px]">
        <div className="font-hana-regular text-3xl w-full">
          <p>
            아직 가족에 속해있지 않아
            <br />
            <span className="font-hana-bold">앨범</span>을 사용할 수 없어요
            <br />
            <span className="font-hana-bold">가족 등록</span>을 먼저해 주세요
          </p>
        </div>

        <div className="w-full flex justify-center items-center my-10">
          <img src={familyGroup} alt="가족 그룹" width={300} height={300} />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
