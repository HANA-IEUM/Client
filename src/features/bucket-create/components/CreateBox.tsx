import type { CreateBoxProps } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet.tsx';
import piggyPng from '@/assets/bucket-edit/piggy.png';
import boxPng from '@/assets/bucket-detail/box.png';

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
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
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
          <p className="font-hana-medium text-lg text-text-secondary">
            {description}
          </p>
        </div>
        <div className="mt-8 flex-grow flex justify-center items-center">
          <img src={piggyPng} alt="저금하기" />
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <Button
          label="취 소"
          size="lg"
          intent="gray"
          font="regular"
          onClick={() => navigate('/home')}
          className="w-1/4"
        />
        <Button
          label="확 인"
          size="lg"
          intent="green"
          font="regular"
          onClick={(e) => setBottomVisible(true)}
          className="w-3/4"
        />
      </div>
      <BottomSheet
        isOpen={bottomVisible}
        onClose={() => setBottomVisible(false)}
      >
        <div className="flex flex-col h-full items-center">
          <p className="font-hana-regular text-left text-3xl w-full !mb-0">
            <span className="font-hana-bold">{title}</span>
            <br />
            버킷리스트 목표금액을
            <br />
            모으기 위한
            <br />
            <span className="font-hana-bold">박스</span>를 개설할께요{' '}
          </p>
          <img src={boxPng} className="w-48 h-48 my-30" alt="저금하기" />
        </div>
        <Button
          label="확 인"
          size="full-lg"
          font="regular"
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
