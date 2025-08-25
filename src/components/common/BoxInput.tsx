import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';

interface PinInputProps {
  length: number;
  onComplete?: (pin: string) => void;
  onChange?: (pin: string) => void;
}

// BoxInput Component
// length: 입력 길이
// onComplete: 입력 완료시 콜백함수
// onChange: 입력 콜백함수
export default function BoxInput({
  length,
  onComplete,
  onChange,
}: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    // 숫자만 입력되도록 정규식을 사용해 필터링
    const newPin = [...pin];

    // 입력 값이 숫자인 경우에만 처리
    if (/^[0-9]$/.test(value)) {
      newPin[index] = value;
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      // 값이 지워진 경우 (예: 백스페이스)
      newPin[index] = '';
    }

    setPin(newPin);
    const completedPin = newPin.join('');

    // onChange 콜백이 있으면 호출
    if (onChange) {
      onChange(completedPin);
    }

    // 모든 칸이 채워졌으면 onComplete 콜백 호출
    if (completedPin.length === length && onComplete) {
      onComplete(completedPin);
    }
  };

  // 백스페이스 처리 함수
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 포커스 시 전체 선택
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="w-full flex gap-2 text-3xl justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          type="text" // type="number"는 스피너가 생길 수 있어 "text"와 pattern을 사용
          pattern="\d*" // 숫자 키패드를 유도 (모바일 환경)
          maxLength={1}
          value={pin[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          className="w-14 h-14 text-center border-3 border-line rounded-lg focus:border-theme-primary outline-none"
        />
      ))}
    </div>
  );
}
