import React, { useEffect, useRef, useState } from 'react';
import { Switch, type InputRef } from 'antd';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import BoxInput from '@/components/common/BoxInput';
import Header from '@/components/Header';
import type { Box } from '@/features/wallet/types';

interface BoxEditProps {
  box: Box;
  onBack: () => void;
  onSave: (updatedBox: {
    boxName: string;
    automaticTransfer: boolean;
    monthlyAmount: number;
    transferDay: string;
  }) => void;
}

const BoxEdit: React.FC<BoxEditProps> = ({ box, onBack, onSave }) => {
  const [boxName, setBoxName] = useState(box.boxName || box.name || '');
  const [automaticTransfer, setAutomaticTransfer] = useState(
    box.automaticTransfer || false
  );
  const [monthlyAmount, setMonthlyAmount] = useState(box.monthlyAmount || 0);
  const [transferDay, setTransferDay] = useState(box.transferDay || '');

  const inputRef = useRef<InputRef>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setMonthlyAmount(0);
      return;
    }
    // 숫자로 변환 후 locale string 적용
    setMonthlyAmount(Number(rawValue));
  };

  useEffect(() => {
    if (automaticTransfer) {
      inputRef.current?.focus();
    }
  }, [automaticTransfer]);

  const handleSave = () => {
    onSave({
      boxName,
      automaticTransfer,
      monthlyAmount,
      transferDay,
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-6">
          <Header onClick={onBack} />
        </div>

        <div className="flex-1 px-6 overflow-y-auto pb-6">
          <div className="space-y-6 text-left">
            <p className="font-hana-regular text-3xl mb-3">
              <span className="font-hana-bold">박스 별명</span>을 입력해 주세요
            </p>
            <Input
              intent="green"
              value={boxName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBoxName(e.target.value)
              }
            />

            <div className="flex items-center gap-15 w-full my-10">
              <span className="font-hana-regular text-3xl">
                <span className="font-hana-bold">자동이체</span> 설정{' '}
              </span>
              <Switch
                checked={automaticTransfer}
                onChange={setAutomaticTransfer}
                style={{
                  backgroundColor: automaticTransfer ? '#008485' : '#d1d5db',
                  transform: 'scale(1.5)',
                  transformOrigin: 'center',
                  position: 'relative',
                  top: '3px',
                }}
              />
            </div>

            {automaticTransfer && (
              <>
                <div className="mt-10">
                  <p className="font-hana-regular text-3xl mb-3">
                    <span className="font-hana-bold">
                      매월 박스에 충전할 금액
                    </span>
                    을
                    <br />
                    입력해 주세요
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={inputRef}
                      value={monthlyAmount.toLocaleString()}
                      onChange={handleChange}
                      type="text"
                      intent="green"
                    />
                    <span className="text-3xl font-hana-regular">원</span>
                  </div>

                  <div className="mt-10">
                    <p className="font-hana-regular text-3xl mb-3">
                      <span className="font-hana-bold">자동이체일</span>을
                      입력해 주세요
                    </p>
                    <div className="flex gap-4 items-center">
                      <BoxInput
                        length={2}
                        value={transferDay}
                        onChange={setTransferDay}
                        align="start"
                      />
                      <p className="text-3xl font-hana-regular !m-0">일</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 !mb-20">
        <Button
          intent="green"
          size="lg"
          className="w-full py-4 text-lg font-hana-bold"
          onClick={handleSave}
          disabled={boxName.length === 0}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default BoxEdit;
