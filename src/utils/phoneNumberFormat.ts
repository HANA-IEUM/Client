/**
 * 전화번호 문자열을 '010-1234-5678'과 같은 형식으로 변환합니다.
 * @param phoneNumber - 하이픈이 없는 전화번호 문자열
 * @returns 포맷팅된 전화번호. 유효하지 않은 경우 원본 문자열을 반환합니다.
 */
export const formatPhoneNumber = (
  phoneNumber: string | null | undefined
): string => {
  if (!phoneNumber) {
    return '';
  }

  // 숫자 이외의 문자를 모두 제거합니다.
  const cleaned = phoneNumber.replace(/\D/g, '');

  // 일반적인 휴대폰 번호(11자리) 또는 지역번호 포함 번호(10자리) 패턴을 찾습니다.
  const match = cleaned.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};
