import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linkMainAccount } from '../apis/accountApi';
import { accountQK } from './useMainAccount';

export function useLinkMainAccount() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: linkMainAccount,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: accountQK.main });
    },
  });
}
