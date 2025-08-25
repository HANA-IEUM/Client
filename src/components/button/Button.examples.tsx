import Button from './Button';

// 버튼 사용 예시
export default function ButtonExamples() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">버튼 예시</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">기본 버튼들</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="disable" label="디스에이블ㅋㅋ" />
          <Button intent="gray" label="나중에 하기" />
          <Button intent="green" label="확인" />
          <Button intent="red" label="확인" />
          <Button intent="mint" label="인증번호 재전송" />
        </div>

        <h3 className="text-lg font-medium">노란색 버튼들</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="yellow" label="등록하기" size="sm" />
          <Button intent="yellow" label="생성하기" size="sm" />
        </div>

        <h3 className="text-lg font-medium">기타 버튼들</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="silver" label="이제 내려" size="sm" />
          <Button intent="silver" label="버킷 보기" size="sm" />
          <Button intent="silver" label="수정하기" size="sm" />
        </div>

        <h3 className="text-lg font-medium">크기별 예시</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button intent="green" label="작은 버튼" size="sm" />
          <Button intent="green" label="보통 버튼" size="md" />
          <Button intent="green" label="큰 버튼" size="lg" />
          <Button intent="green" label="매우 큰 버튼" size="xl" />
        </div>

        <h3 className="text-lg font-medium">전체 너비 버튼</h3>
        <div className="space-y-2">
          <Button intent="green" label="전체 너비 버튼" size="full" />
          <Button intent="green" label="전체 너비 큰 버튼" size="full-lg" />
        </div>

        <h3 className="text-lg font-medium">폰트 스타일별</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="green" label="Regular" font="regular" />
          <Button intent="green" label="Bold" font="bold" />
          <Button intent="green" label="Medium" font="medium" />
        </div>

        <h3 className="text-lg font-medium">라운드 스타일별</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="green" label="작은 라운드" radius="sm" />
          <Button intent="green" label="보통 라운드" radius="md" />
          <Button intent="green" label="큰 라운드" radius="lg" />
          <Button intent="green" label="매우 큰 라운드" radius="xl" />
          <Button intent="green" label="완전 라운드" radius="full" />
        </div>

        <h3 className="text-lg font-medium">상태별</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="green" label="일반 상태" />
          <Button intent="green" label="비활성화" disabled />
          <Button intent="green" label="로딩 중" loading />
        </div>
      </div>
    </div>
  );
}
