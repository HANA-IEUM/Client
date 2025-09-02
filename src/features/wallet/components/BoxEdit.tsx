import { Switch, type InputRef } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import Button from '@/components/button/Button';
import BoxInput from '@/components/common/BoxInput';
import Header from '@/components/Header';
import Input from '@/components/input/Input';
import BoxPasswordBottomSheet from '@/features/wallet/components/BoxPasswordBottomSheet';
import {
  useMoneyBoxEditInfo,
  useUpdateMoneyBox,
} from '@/features/wallet/hooks/useMainAccount';
import type { Box } from '@/features/wallet/types';
import { showSuccess, showError } from '@/lib/toast';

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
  const [boxName, setBoxName] = useState('');
  const [automaticTransfer, setAutomaticTransfer] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [transferDay, setTransferDay] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const inputRef = useRef<InputRef>(null);

  // API로 박스 수정 정보 가져오기
  const { data: editInfo } = useMoneyBoxEditInfo(box.accountId || 0);

  // 박스 수정 mutation
  const { mutate: updateBox, isPending: isUpdating } = useUpdateMoneyBox();

  // API 데이터로 초기 상태 설정 (처음 1회만 반영)
  useEffect(() => {
    if (editInfo && !initialized) {
      setBoxName(editInfo.boxName ?? '');
      setAutomaticTransfer(!!editInfo.nextAutoTransferEnabled);
      setMonthlyAmount(editInfo.nextMonthlyAmount ?? 0);
      setTransferDay(
        editInfo.nextTransferDay != null ? String(editInfo.nextTransferDay) : ''
      );
      setInitialized(true);
    }
  }, [editInfo, initialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setMonthlyAmount(0);
      return;
    }
    setMonthlyAmount(Number(rawValue));
  };

  useEffect(() => {
    if (automaticTransfer) {
      inputRef.current?.focus();
    }
  }, [automaticTransfer]);

  const handleSave = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordConfirm = (password: string) => {
    const requestData = {
      accountId: box.accountId || 0,
      editData: {
        boxName,
        autoTransferEnabled: automaticTransfer,
        monthlyAmount: automaticTransfer ? monthlyAmount : null,
        transferDay: automaticTransfer ? parseInt(transferDay) || 1 : null,
        accountPassword: password,
      },
    };

    updateBox(requestData, {
      onSuccess: () => {
        showSuccess('박스 정보가 수정되었습니다.');
        setShowPasswordInput(false);
        onSave({
          boxName,
          automaticTransfer,
          monthlyAmount,
          transferDay,
        });
      },
      onError: (error) => {
        showError('박스 정보 수정에 실패했습니다.');
        setShowPasswordInput(false);
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col">
      {showPasswordInput && (
        <BoxPasswordBottomSheet
          open={showPasswordInput}
          onClose={() => setShowPasswordInput(false)}
          onConfirm={(pin) => handlePasswordConfirm(pin)}
        />
      )}

      <>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="px-6">
            <Header onClick={onBack} />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6 text-left">
              <p className="font-hana-regular mb-3 text-3xl">
                <span className="font-hana-bold">박스 별명</span>을 입력해
                주세요
              </p>
              <Input
                intent="green"
                value={boxName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBoxName(e.target.value)
                }
              />

              <div className="my-10 flex w-full items-center gap-15">
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
                    <p className="font-hana-regular mb-3 text-3xl">
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
                      <span className="font-hana-regular text-3xl">원</span>
                    </div>

                    <div className="mt-10">
                      <p className="font-hana-regular mb-3 text-3xl">
                        <span className="font-hana-bold">자동이체일</span>을
                        입력해 주세요
                      </p>
                      <div className="flex items-center gap-4">
                        <BoxInput
                          length={2}
                          value={transferDay}
                          onChange={setTransferDay}
                          align="start"
                        />
                        <p className="font-hana-regular !m-0 text-3xl">일</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="!mb-20 px-6 pb-6">
          <Button
            intent="green"
            size="lg"
            className="font-hana-bold w-full py-4 text-lg"
            onClick={handleSave}
            disabled={boxName.length === 0}
            loading={isUpdating}
          >
            저장
          </Button>
        </div>
      </>
    </div>
  );
};

export default BoxEdit;
