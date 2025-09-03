import Button from '@/components/button/Button';

type BucketManageButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  isDeleting?: boolean;
  canComplete: boolean;
  bucketListStatus: 'IN_PROGRESS' | 'COMPLETED';
};

const BucketManageButtons = ({
  onEdit,
  onDelete,
  onComplete,
  isDeleting,
  canComplete,
  bucketListStatus,
}: BucketManageButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        onClick={onEdit}
        label="버킷 수정"
        intent="gray"
        size="xl"
        className="w-full !px-2"
      />

      <Button
        onClick={onDelete}
        label={isDeleting ? '삭제 중입니다...' : '버킷 삭제'}
        intent="gray"
        size="xl"
        className="w-full !px-2"
      />

      {canComplete ? (
        <Button
          onClick={onComplete}
          label="달성 완료"
          intent="yellow"
          size="xl"
          className="w-full !px-2"
        />
      ) : bucketListStatus === 'IN_PROGRESS' ? (
        <Button
          label="진행 중"
          intent="gray"
          size="xl"
          className="w-full !px-2"
        />
      ) : (
        <Button
          label="완료"
          intent="green"
          size="xl"
          disabled
          className="w-full !px-2"
        />
      )}
    </div>
  );
};

export default BucketManageButtons;
