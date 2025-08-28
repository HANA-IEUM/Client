import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import LandingPage from '@/pages/LandingPage';
import Button from '@/components/button/Button';

const OnboardingWrapper = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [atLast, setAtLast] = useState(false);
  const readyRef = useRef(false);

  if (!showOnboarding) return <LandingPage />;

  const handleSlideChange = (swiper: SwiperType) => {
    const isLast = swiper.activeIndex === swiper.slides.length - 1;
    setAtLast(isLast);
    if (!isLast) readyRef.current = false;
  };

  const handleTransitionEnd = (swiper: SwiperType) => {
    const isLast = swiper.activeIndex === swiper.slides.length - 1;
    readyRef.current = isLast;
  };

  const handleTouchEnd = (swiper: SwiperType) => {
    if (
      swiper.isEnd &&
      atLast &&
      readyRef.current &&
      swiper.swipeDirection === 'next'
    ) {
      setShowOnboarding(false);
    }
  };

  return (
    <div className="h-full w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="h-full w-full"
        onSlideChange={handleSlideChange}
        onTransitionEnd={handleTransitionEnd}
        onTouchEnd={handleTouchEnd}
      >
        <SwiperSlide>
          <div className="flex flex-col h-full items-center justify-center font-hana-bold">
            <h1 className="text-3xl font-bold">
              하나이음에 오신 것을 환영합니다
            </h1>
            <p className="mt-4">쉽고 빠른 금융 경험을 시작해 보세요</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col h-full items-center justify-center font-hana-bold">
            <h1 className="text-3xl font-bold">버킷리스트와 함께하는 금융</h1>
            <p className="mt-4">당신의 목표를 응원합니다</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col h-full items-center justify-center px-6 text-center font-hana-bold">
            <h1 className="text-3xl font-bold">시작해 볼까요?</h1>
            <p className="mt-4">한 번 더 넘기면 로그인 화면으로 이동합니다</p>

            <div className="mt-10 w-full max-w-md">
              <Button
                intent="green"
                size="full"
                label="바로 시작하기"
                onClick={() => setShowOnboarding(false)}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OnboardingWrapper;
