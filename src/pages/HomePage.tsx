import { useState } from 'react';
import CallIcon from '@/assets/common/CallIcon';
import BucketStateItem from '@/components/BucketStateItem';
import BucketListCategoryItem from '@/components/BucketListCategoryItem';
import SelectItem from '@/components/SelectItem';
import BucketListItem from '@/components/BucketListItem';
import AccountItem from '@/components/AccountItem';
import Header from '@/components/Header';

const HomePage = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <Header onClick={() => console.log('헤더 클릭')} />
      홈 페이지입니다.
      <CallIcon />
      <BucketStateItem
        text="전체"
        selected={selected}
        onClick={() => setSelected((v) => !v)}
      />
      <SelectItem
        text="원윤서"
        selected={selected}
        onClick={() => setSelected((v) => !v)}
      />
      <BucketListCategoryItem text="건강" color="green" />
      <BucketListCategoryItem text="여행" color="blue" />
      <BucketListCategoryItem text="취미" color="pink" />
      <BucketListCategoryItem text="재테크" color="yellow" />
      <AccountItem
        accountName="달달 하나 통장"
        accountNum="1234-5678-21"
        selected={selected}
        onClick={() => setSelected((v) => !v)}
      />
      <BucketListItem
        category="health"
        text="만보 걷기"
        date="2025.02.01"
        completed={true}
      />
    </div>
  );
};

export default HomePage;
