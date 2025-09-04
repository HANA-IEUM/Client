// Step 4-1: 목표 금액
import { type InputRef } from 'antd';
import Lottie from 'lottie-react';
import React, { useEffect, useRef, useState } from 'react';

import aiLoadingJson from '@/assets/bucket-detail/ailoadind.json';
import BubbleIcon from '@/assets/bucket-detail/bubble.png';
import starBoyIcon from '@/assets/common/header/starBoy.png';
import Button from '@/components/button/Button.tsx';
import Input from '@/components/input/Input.tsx';
import { useEstimateBucketCost } from '@/features/bucket-create/hooks/useEstimateBucketCost.ts';
import type { GoalAmountProps } from '@/features/bucket-create/types/props.ts';

export const GoalAmount = ({
  bucket,
  amount,
  setAmount,
  onNext,
}: GoalAmountProps) => {
  const inputRef = useRef<InputRef>(null);
  const [isDisplayingLoader, setIsDisplayingLoader] = useState(false);
  const [aiAmount, setAiAmount] = useState('');

  const bucketCostMutation = useEstimateBucketCost();

  useEffect(() => {
    inputRef.current?.focus();
    if (bucket) {
      setIsDisplayingLoader(true);

      const minDisplayTimePromise = new Promise((resolve) =>
        setTimeout(resolve, 4500)
      );

      const mutationPromise = new Promise((resolve, reject) => {
        bucketCostMutation.mutate(bucket, {
          onSuccess: (data) => {
            if (data) {
              const formatted = data.toLocaleString();
              setAiAmount(formatted);
            }
            resolve(data);
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      Promise.allSettled([mutationPromise, minDisplayTimePromise]).finally(
        () => {
          setIsDisplayingLoader(false);
        }
      );
    }
  }, [bucket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setAmount('');
      return;
    }
    // 숫자로 변환 후 locale string 적용
    const formatted = Number(rawValue).toLocaleString();
    setAmount(formatted);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <div>
          <p className="font-hana-regular mb-3 text-3xl">
            버킷리스트를 이루기 위한
            <br />
            <span className="font-hana-bold">목표 금액</span>을 입력해 주세요
          </p>
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={amount}
              onChange={handleChange}
              placeholder="3,000,000"
              type="text"
              intent="green"
            />
            <span className="font-hana-regular text-3xl">원</span>
          </div>
        </div>
      </div>
      {isDisplayingLoader ? (
        <>
          <p className={'font-hana-regular text-text text-2xl'}>
            AI가 <span className={'font-hana-bold'}>적정 목표 금액</span>을
            <br />
            산출 중이에요
          </p>
          <Lottie
            animationData={aiLoadingJson}
            loop={true}
            className="m-auto h-80 w-80"
          />
        </>
      ) : (
        <>
          <div>
            <div className="relative">
              <img src={BubbleIcon} alt="말풍선 배경" className="w-full" />
              <div className="absolute top-0 left-0 mt-4 ml-4 flex h-full w-full text-left">
                <p
                  className={
                    'font-hana-regular text-text-primary text-2xl leading-relaxed'
                  }
                >
                  이음이가 분석한 결과,
                  <br />
                  <span className={'font-hana-bold'}>{bucket}</span>에는
                  <br />
                  {aiAmount}원이 필요해요
                </p>
              </div>
            </div>
            <div className={'flex justify-end'}>
              <Button
                label={'AI 추천 금액 적용'}
                intent={'yellow'}
                className={'w-full'}
                onClick={() => setAmount(aiAmount)}
              />
              <img className={'h-56 w-32'} src={starBoyIcon} alt={'!'} />
            </div>
          </div>
        </>
      )}
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={onNext}
        disabled={!amount || isDisplayingLoader}
      />
    </div>
  );
};
