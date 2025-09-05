import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { checkBucketCreationAvailability } from '@/features/home/apis/apis.ts';
import { showError } from '@/lib/toast';

export const useCheckCreationAvailability = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: checkBucketCreationAvailability,
    onSuccess: (data) => {
      if (data.canCreate) {
        navigate('/bucket-create');
      } else {
        showError('더 이상 버킷리스트를 생성할 수 없어요.', {
          duration: 4000,
        });
      }
    },
    onError: () => {
      showError('오류가 발생했어요. 다시 시도해주세요.');
    },
  });
};
