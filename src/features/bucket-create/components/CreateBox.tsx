import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import boxPng from '@/assets/bucket-detail/box.png';
import piggyPng from '@/assets/bucket-edit/piggy.png';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet.tsx';

import type { CreateBoxProps } from '../types/props.ts';

// Step 5: 박스 생성 확인
export const CreateBox = ({
  title,
  targetAmount,
  period,
  livingCost,
  onNext,
}: CreateBoxProps) => {
  const navigate = useNavigate();
  const [bottomVisible, setBottomVisible] = useState(false);

  // 콤마 제거 및 월 저축액 계산
  const cleanAmount = Number(targetAmount.replace(/,/g, ''));
  const monthlySaving = period ? Math.round(cleanAmount / period) : 0;

  // 월 생활비 대비 저축액 비율 및 설명 문구 계산
  const getDescriptiveText = () => {
    if (livingCost <= 0) return { text: '', percentage: 0 };

    const percentage = Math.round((monthlySaving / livingCost) * 100);
    let text = '';
    if (percentage <= 25) {
      text = '현재 월 생활비 대비 여유로운 수준이에요';
    } else if (percentage <= 50) {
      text = '현재 월 생활비 대비 적절한 수준이에요';
    } else if (percentage <= 75) {
      text = '현재 월 생활비 대비 다소 많은 편이에요';
    } else {
      text = '현재 월 생활비 대비 매우 부담될 수 있어요';
    }
    return { text };
  };
  const { text: description } = getDescriptiveText();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl">
          버킷리스트를 이루기 위해
          <br />
          한달에{' '}
          <span className="font-hana-bold">
            {monthlySaving.toLocaleString()}
          </span>
          원씩
          <br />
          모아야해요
        </p>
        <div className="text-left">
          <p className="font-hana-medium text-text-secondary text-lg">
            {description}
          </p>
        </div>
        <div className="mt-8 flex flex-grow items-center justify-center">
          <img src={piggyPng} alt="저금하기" />
        </div>
      </div>

      <div className="flex w-full gap-2">
        <Button
          label="취소"
          size="full"
          intent="gray"
          onClick={() => navigate('/home')}
          className="w-1/4"
        />
        <Button
          label="확 인"
          size="full"
          intent="green"
          onClick={(e) => setBottomVisible(true)}
          className="w-3/4"
        />
      </div>
      <BottomSheet
        isOpen={bottomVisible}
        onClose={() => setBottomVisible(false)}
      >
        <div className="mt-4 flex h-full flex-col items-center">
          <p className="font-hana-regular !mb-0 w-full text-left text-3xl">
            <span className="font-hana-bold">{title}</span>
            <br />
            버킷리스트 목표금액을
            <br />
            모으기 위한
            <br />
            <span className="font-hana-bold">박스</span>를 개설할게요{' '}
          </p>
          <img src={boxPng} className="my-30 h-48 w-48" alt="저금하기" />
        </div>
        <Button
          label="확 인"
          size="full"
          intent="green"
          onClick={() => {
            setBottomVisible(false);
            onNext();
          }}
        />
      </BottomSheet>
    </div>
  );
};
