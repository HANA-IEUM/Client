import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountQK } from './useMainAccount';
import { linkMainAccount } from '../apis/accountApi';

export function useLinkMainAccount() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: linkMainAccount,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: accountQK.main });
    },
  });
}
