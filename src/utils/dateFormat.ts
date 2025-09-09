export function formatKoreanDateTime(
  dateString: string,
  showTime: boolean = true
): string {
  try {
    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    const utcString = isDateOnly
      ? `${dateString}T00:00:00Z`
      : dateString.endsWith('Z')
        ? dateString
        : `${dateString}Z`;
    const date = new Date(utcString);

    if (isNaN(date.getTime())) {
      return '날짜 형식 오류';
    }

    const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const year = koreanTime.getUTCFullYear();
    const month = String(koreanTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(koreanTime.getUTCDate()).padStart(2, '0');

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[koreanTime.getUTCDay()];

    const dateFormat = `${year}.${month}.${day} (${weekday})`;

    if (showTime) {
      const hours = String(koreanTime.getUTCHours()).padStart(2, '0');
      const minutes = String(koreanTime.getUTCMinutes()).padStart(2, '0');
      return `${dateFormat} ${hours}시 ${minutes}분`;
    } else {
      return dateFormat;
    }
  } catch (error) {
    return '날짜 형식 오류';
  }
}

//상대적 시간 포맷터 (쓰는 곳 없긴 한데..)
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '날짜 형식 오류';
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return formatKoreanDateTime(dateString, false);
    }
  } catch (error) {
    return '날짜 형식 오류';
  }
}
