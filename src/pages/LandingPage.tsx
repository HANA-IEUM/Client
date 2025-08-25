import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div>
      <h1 className="font-hana-medium">랜딩 페이지입니다.</h1>
      <Button>기본 버튼</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="destructive">위험 버튼</Button>
      <button className="bg-theme-primary">하나그린 버튼</button>
    </div>
  );
};

export default LandingPage;
