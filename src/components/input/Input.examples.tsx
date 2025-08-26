import Input from '@/components/input/Input';

export default function InputExamples() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Input 예시</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">기본 Input들</h3>
        <div className="space-y-4">
          <Input intent="green" placeholder="전화번호 입력" />
          <Input intent="red" placeholder="이름 입력" />
        </div>

        <h3 className="text-lg font-medium">폰트 스타일별</h3>
        <div className="space-y-4">
          <Input intent="green" font="regular" placeholder="Regular 폰트" />
          <Input intent="green" font="bold" placeholder="Bold 폰트" />
        </div>

        <h3 className="text-lg font-medium">Intent별 예시</h3>
        <div className="space-y-4">
          <Input intent="green" placeholder="Green intent (theme-primary)" />
          <Input intent="red" placeholder="Red intent (accent-primary)" />
        </div>

        <h3 className="text-lg font-medium">도움말 텍스트가 있는 Input</h3>
        <div className="space-y-4">
          <Input
            intent="green"
            placeholder="비밀번호 입력"
            helperText="8자 이상 입력해주세요"
          />
          <Input
            intent="red"
            placeholder="이메일 입력"
            helperText="올바른 이메일 형식으로 입력해주세요"
          />
        </div>

        <h3 className="text-lg font-medium">에러 상태</h3>
        <div className="space-y-4">
          <Input
            intent="green"
            placeholder="전화번호 입력"
            error="올바른 전화번호 형식이 아닙니다"
          />
          <Input
            intent="red"
            placeholder="이름 입력"
            error="이름을 입력해주세요"
          />
        </div>

        <h3 className="text-lg font-medium">비활성화 상태</h3>
        <div className="space-y-4">
          <Input intent="green" placeholder="비활성화된 입력 필드" disabled />
          <Input intent="red" placeholder="비활성화된 입력 필드" disabled />
        </div>

        <h3 className="text-lg font-medium">실제 사용 예시</h3>
        <div className="space-y-4">
          <Input
            intent="green"
            placeholder="01012345678"
            helperText="하이픈(-) 없이 숫자만 입력"
          />
          <Input intent="red" label="이름" placeholder="대현이네" font="bold" />
          <Input intent="green" placeholder="비밀번호 입력" type="password" />
        </div>
      </div>
    </div>
  );
}
