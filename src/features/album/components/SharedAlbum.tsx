import { useState } from 'react';
import Button from '@/components/button/Button';
import BucketStateItem from '@/components/BucketStateItem';
import PhotoUploadPage from '@/features/album/components/PhotoUploadPage';
import AlbumDetailPage from '@/features/album/components/AlbumDetailPage';
import { useAlbums } from '@/features/album/hooks/useAlbums';
import type { Photo } from '@/features/album/apis/albumApi';

type FilterType = 'all' | '박승희' | '원윤서' | '정재희';

const SharedAlbum = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState<'album' | 'upload' | 'detail'>(
    'album'
  );
  const [selectedAlbum, setSelectedAlbum] = useState<Photo | null>(null);

  const filters: FilterType[] = ['all', '박승희', '원윤서', '정재희'];

  const { data: albumResponse, isLoading, error } = useAlbums();
  const albumEntries = albumResponse?.photos || [];

  const handleWriteClick = () => {
    setCurrentPage('upload');
  };

  const handleBackToAlbum = () => {
    setCurrentPage('album');
  };

  const handleAlbumClick = (album: Photo) => {
    setSelectedAlbum(album);
    setCurrentPage('detail');
  };

  const handleBackToAlbumList = () => {
    setCurrentPage('album');
    setSelectedAlbum(null);
  };

  const handleDeleteAlbum = () => {
    handleBackToAlbumList();
  };

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const filteredEntries =
    selectedFilter === 'all'
      ? albumEntries
      : albumEntries.filter((entry) => entry.name === selectedFilter);

  if (currentPage === 'upload') {
    return <PhotoUploadPage onBack={handleBackToAlbum} />;
  }

  if (currentPage === 'detail' && selectedAlbum) {
    return (
      <AlbumDetailPage
        albumData={selectedAlbum}
        isOwner={selectedAlbum.mine}
        onBack={handleBackToAlbumList}
        onDelete={handleDeleteAlbum}
      />
    );
  }

  return (
    <div className="w-full h-full">
      {/* 앨범 페이지 내용 */}
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

      <div className="px-6 pb-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-lg font-hana-regular text-text-secondary">
              앨범을 불러오는 중...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-lg font-hana-regular text-accent-primary mb-4">
              앨범을 불러오는데 실패했습니다
            </div>
            <Button
              intent="green"
              size="lg"
              onClick={() => window.location.reload()}
            >
              다시 시도
            </Button>
          </div>
        ) : filteredEntries.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.photoId}
                className="space-y-2 cursor-pointer"
                onClick={() => handleAlbumClick(entry)}
              >
                <div className="aspect-square bg-theme-secondary rounded-2xl overflow-hidden">
                  <img
                    src={entry.imgUrl}
                    alt={entry.caption}
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
                    <span className="text-base font-hana-regular text-text-primary">
                      {entry.caption}
                      <span className="text-base font-hana-regular text-text-secondary">
                        {' '}
                        | {entry.name}
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
