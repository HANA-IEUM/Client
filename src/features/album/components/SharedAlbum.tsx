import { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import BucketStateItem from '@/components/BucketStateItem';
import PhotoUploadPage from '@/features/album/components/PhotoUploadPage';
import AlbumDetailPage from '@/features/album/components/AlbumDetailPage';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import FamilyRegistrationBottomSheet from './FamilyRegistrationBottomSheet';
import { useAlbums } from '@/features/album/hooks/useAlbums';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import type { Photo } from '@/features/album/apis/albumApi';

type FilterType = 'all' | string;

const SharedAlbum = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState<'album' | 'upload' | 'detail'>(
    'album'
  );
  const [selectedAlbum, setSelectedAlbum] = useState<Photo | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { data: groupInfo, isLoading: groupLoading } = useGroupInfo();
  const {
    data: albumResponse,
    isLoading,
    error,
  } = useAlbums({
    enabled: !!groupInfo, // 가족 그룹이 있을 때만 API 호출
  });
  const albumEntries = albumResponse?.photos || [];

  // 컴포넌트 마운트 시 가족 그룹 상태 확인
  useEffect(() => {
    // 그룹 정보 로딩이 완료되고, 가족 그룹이 없는 경우 바텀시트 표시
    if (!groupLoading && !groupInfo) {
      setShowBottomSheet(true);
    }
  }, [groupInfo, groupLoading]);

  // 필터 목록 생성: '모두' + 그룹 멤버 이름들
  const filters: FilterType[] = [
    'all',
    ...(groupInfo?.members.map((member) => member.name) || []),
  ];

  const handleWriteClick = () => {
    // 가족 그룹에 속해있지 않은 경우 바텀시트 표시
    if (!groupInfo) {
      setShowBottomSheet(true);
      return;
    }
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
              intent={groupInfo ? 'yellow' : 'disable'}
              size="md"
              className="!px-6 !py-3 !text-base !font-hana-bold"
              onClick={handleWriteClick}
              disabled={!groupInfo}
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
          // 로딩 상태
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-lg font-hana-regular text-text-secondary">
              앨범을 불러오는 중...
            </div>
          </div>
        ) : error ? (
          // 에러 상태
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
          // 앨범 목록
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
          // 사진이 없을 때: 필터 상태에 따라 다른 메시지 표시
          <EmptyStateMessage
            title={
              selectedFilter === 'all'
                ? '앨범이 비어있어요'
                : `${selectedFilter}님이 작성한 글이 없어요`
            }
            subtitle={
              selectedFilter === 'all'
                ? '가족들과 추억을 공유해 보세요'
                : '다른 가족 구성원의 글을 확인해 보세요'
            }
          />
        )}
      </div>

      {/* 가족 등록 안내 바텀시트 */}
      <FamilyRegistrationBottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      />
    </div>
  );
};

export default SharedAlbum;
