import { Button } from 'antd';

const LandingPage = () => {
  return (
    <div>
      <h1 className="font-hana-medium">랜딩 페이지입니다.</h1>
      <Button>Default</Button>

      {/* 기본 제공 프라이머리 */}
      <Button type="primary">Primary</Button>

      {/* 위험(빨간색) 버튼 */}
      <Button danger>Danger</Button>

      {/* 점선 스타일 */}
      <Button type="dashed">Dashed</Button>

      {/* 링크 버튼 */}
      <Button type="link">Link</Button>
    </div>
  );
};

export default LandingPage;
