import { useState } from 'react';
import CallIcon from '@/assets/common/CallIcon';
import AccountItem from '@/components/AccountItem';

const HomePage = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      홈 페이지입니다.
      <CallIcon />
      <AccountItem
        accountName="달달 하나 통장"
        accountNum="352-1022-1234-12"
        selected={selected}
        onClick={() => setSelected((v) => !v)}
      />
    </div>
  );
};

export default HomePage;
