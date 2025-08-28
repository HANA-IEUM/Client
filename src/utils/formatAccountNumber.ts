export const formatAccountNumber = (num: string) => {
  return num.replace(/(\d{4})(?=\d)/g, '$1-');
};
