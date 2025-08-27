import Button from '@/components/button/Button';
import piggyPng from '@/assets/bucket-edit/piggy.png';

const BucketEditSummary = () => {
  const amount = 40000;
  return (
    <div className="relative h-full flex flex-col items-center w-full pt-12 px-6 pb-5">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <br />
          버킷리스트를 이루기 위해
          <br />
          <span className="font-hana-bold">
            한달에 {amount.toLocaleString()}원씩
          </span>
          <br />
          모아야 해요
        </p>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <img src={piggyPng} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <div className="flex gap-5">
          <Button intent="gray" label="취소" className="w-1/3" />
          <Button
            intent="green"
            label="수정 완료"
            className="cursor-pointer w-2/3"
          />
        </div>
      </div>
    </div>
  );
};

export default BucketEditSummary;
