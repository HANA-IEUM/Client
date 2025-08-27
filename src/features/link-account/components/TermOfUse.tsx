import { useState, useMemo } from 'react';
import Button from '@/components/button/Button';
import CheckIcon from '@/assets/common/CheckIcon';

type Term = { title: string; content: string };
type TermOfUseProps = {
  onNext: () => void;
};

const TermOfUse = ({ onNext }: TermOfUseProps) => {
  const terms = useMemo<Term[]>(
    () => [
      {
        title: '[필수] 전자금융거래 기본약관',
        content: '이용 약관 확인 및 동의',
      },
      {
        title: '[필수] 입출금통장(상품) 약관',
        content: '이용 약관 확인 및 동의',
      },
      {
        title: '[필수] 입출금통장(상품) 약관',
        content: '이용 약관 확인 및 동의',
      },
      {
        title: '[필수] 개인정보 수집·이용 동의',
        content: '이용 약관 확인 및 동의',
      },
      {
        title: '[선택] 제3자 제공 동의',
        content: '제휴사 이벤트·혜택 제공 목적',
      },
    ],
    []
  );

  const requiredMask = useMemo(
    () => terms.map((t) => t.title.startsWith('[필수]')),
    [terms]
  );

  const [checked, setChecked] = useState<boolean[]>(() =>
    terms.map(() => false)
  );

  const allChecked = checked.every(Boolean);
  const allRequiredChecked = requiredMask.every((req, i) => !req || checked[i]);

  const toggleItem = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const toggleAll = (value?: boolean) => {
    const next = typeof value === 'boolean' ? value : !allChecked;
    setChecked((prev) => prev.map(() => next));
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto,auto,1fr,auto] w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl mb-7">
        <span>
          하나이음
          <br />
          <span className="font-hana-bold">서비스 약관</span>에 동의해주세요
        </span>
      </div>

      <button
        type="button"
        onClick={() => toggleAll()}
        className="rounded-md flex gap-3 w-full py-3 items-center pl-5 mb-4 shadow-md mt-7 bg-btn-default-bg cursor-pointer text-left"
      >
        <div className="flex justify-center items-center">
          <CheckIcon selected={allChecked} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-hana-bold">모두 동의합니다.</span>
        </div>
      </button>

      <div className="mt-5 scrollbar-hide overflow-y-auto min-h-0 pr-1 mb-5">
        {terms.map(({ title, content }, idx) => (
          <button
            key={`${title}-${idx}`}
            type="button"
            onClick={() => toggleItem(idx)}
            className="w-full cursor-pointer text-left"
          >
            <div className="rounded-md flex gap-3 w-full py-2 pl-5 mb-7 shadow-md">
              <div className="flex justify-center items-center">
                <CheckIcon selected={checked[idx]} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-hana-bold">{title}</span>
                <span className="text-lg font-hana-regular">{content}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pb-6">
        <Button
          intent={allRequiredChecked ? 'green' : 'gray'}
          label="확인"
          size="full"
          disabled={!allRequiredChecked}
          className="cursor-pointer"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default TermOfUse;
