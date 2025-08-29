import Button from '@/components/button/Button';
import Header from '@/components/Header';

interface AlbumDetailPageProps {
  albumData: {
    id: number;
    image: string;
    text: string;
    author: string;
    date: string;
  };
  isOwner: boolean; // 내가 작성한 글인지 여부
  onBack: () => void;
  onDelete?: () => void;
}

const AlbumDetailPage = ({
  albumData,
  isOwner,
  onBack,
  onDelete,
}: AlbumDetailPageProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-6 !mb-8">
        <Header onClick={onBack} />
        <p className="text-3xl font-hana-bold text-text-primary !mt-2 !mb-0">
          {albumData.author}
        </p>
      </div>

      <div className="flex-1 px-6">
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">
          <img
            src={albumData.image}
            alt="앨범 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-4">
          <p className="text-2xl font-hana-bold text-text-primary mb-2">
            {albumData.text}
          </p>
          <p className="text-lg font-hana-regular text-text-secondary">
            {albumData.date}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        {isOwner ? (
          // 내가 작성한 글인 경우: 삭제 + 확인 버튼
          <div className="flex gap-3">
            <Button
              intent="red"
              size="lg"
              className="flex-1 !py-4 !text-lg !font-hana-bold"
              onClick={handleDelete}
            >
              삭제
            </Button>
            <Button
              intent="green"
              size="lg"
              className="flex-1 !py-4 !text-lg !font-hana-bold"
              onClick={onBack}
            >
              확인
            </Button>
          </div>
        ) : (
          <Button
            intent="green"
            size="lg"
            className="w-full !py-4 !text-lg !font-hana-bold"
            onClick={onBack}
          >
            확인
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
