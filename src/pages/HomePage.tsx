import { useState } from 'react';
import CallIcon from '@/assets/common/CallIcon';
import BucketStateItem from '@/components/BucketStateItem';

const HomePage = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      홈 페이지입니다.
      <CallIcon />
      <BucketStateItem
        text="전체"
        selected={selected}
        onClick={() => setSelected((v) => !v)}
      />
    </div>
  );
};

export default HomePage;
