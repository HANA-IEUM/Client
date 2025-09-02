import { useMutation } from '@tanstack/react-query';

import { hideGroupPrompt } from '../apis/auth';

export function useHideGroupPrompt() {
  return useMutation({
    mutationFn: hideGroupPrompt,
  });
}
