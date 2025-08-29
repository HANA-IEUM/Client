import { useState } from 'react';
import Button from '@/components/button/Button';
import BucketStateItem from '@/components/BucketStateItem';

type FilterType = 'all' | '박승희' | '원윤서' | '정재희';

interface AlbumEntry {
  id: number;
  image: string;
  text: string;
  author: string;
}

const SharedAlbum = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const filters: FilterType[] = ['all', '박승희', '원윤서', '정재희'];

  const albumEntries: AlbumEntry[] = [
    {
      id: 1,
      image: '/src/assets/common/album-sample.jpg',
      text: '여행 다녀왔어',
      author: '박승희',
    },
    {
      id: 2,
      image: '/src/assets/common/album-sample.jpg',
      text: '음..오늘은 ...',
      author: '원윤서',
    },
    {
      id: 3,
      image: '/src/assets/common/album-sample.jpg',
      text: '맛있는 점심',
      author: '정재희',
    },
    {
      id: 4,
      image: '/src/assets/common/album-sample.jpg',
      text: '산책하기 좋은 날씨',
      author: '박승희',
    },
    {
      id: 5,
      image: '/src/assets/common/album-sample.jpg',
      text: '커피 한잔의 여유',
      author: '원윤서',
    },
    {
      id: 6,
      image: '/src/assets/common/album-sample.jpg',
      text: '가족과 함께',
      author: '정재희',
    },
  ];

  const handleWriteClick = () => {
    console.log('작성하기 클릭');
  };

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const filteredEntries =
    selectedFilter === 'all'
      ? albumEntries
      : albumEntries.filter((entry) => entry.author === selectedFilter);

  return (
    <div className="w-full h-full">
      <div className="w-full bg-theme-primary pt-12 pb-12 rounded-b-2xl mb-4">
        <div className="px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-hana-bold text-white !mb-0">
              공유 앨범
            </h1>
            <Button
              intent="yellow"
              size="md"
              className="!px-6 !py-3 !text-base !font-hana-bold"
              onClick={handleWriteClick}
            >
              작성하기
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="flex gap-3">
          {filters.map((filter) => (
            <BucketStateItem
              key={filter}
              text={filter === 'all' ? '모두' : filter}
              selected={selectedFilter === filter}
              onClick={() => handleFilterClick(filter)}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-20">
        {filteredEntries.length > 0 ? (
          // 사진이 있을 때: 그리드 레이아웃
          <div className="grid grid-cols-2 gap-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="space-y-2">
                <div className="aspect-square bg-theme-secondary rounded-2xl overflow-hidden">
                  <img
                    src={entry.image}
                    alt={entry.text}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <span class="text-theme-primary text-lg font-hana-bold">📷</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="!mb-0">
                    <span className="font-hana-base text-regular text-text-primary">
                      {entry.text}
                      <span className="font-hana-base text-regular text-text-secondary">
                        {' '}
                        | {entry.author}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 사진이 없을 때: 빈 상태 표시
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-40 h-32 flex items-center justify-center mb-6">
              <img
                src="/src/assets/common/empty.svg"
                alt="빈 앨범"
                className="w-full h-full object-contain"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                }}
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-2xl font-hana-bold text-line !mb-0">
                앨범이 비어있어요
              </p>
              <p className="text-2xl font-hana-bold text-line !mb-0">
                가족들과 추억을 공유해 보세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedAlbum;
