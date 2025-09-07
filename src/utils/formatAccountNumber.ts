export const formatAccountNumber = (
  accountNumber: string | null | undefined
): string => {
  if (!accountNumber) {
    return '';
  }

  const cleaned = accountNumber.replace(/\D/g, '');

  if (cleaned.length !== 14) {
    return accountNumber;
  }

  // XXX-ZZZZZZ-ZZCYY 형식으로 포맷팅 (3-6-5)
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 9)}-${cleaned.slice(9, 14)}`;
};
