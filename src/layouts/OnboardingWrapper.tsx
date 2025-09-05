import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';

import onboardingHouse from '@/assets/onboarding/onboardingHouse.png';
import onboardingMoneyBox from '@/assets/onboarding/onboardingMoneyBox.png';
import onboardingTravel from '@/assets/onboarding/onboardingTravel.png';
import Button from '@/components/button/Button';
import DotIndicator from '@/components/intro/DotIndicator';
import IntroSlide from '@/components/intro/IntroSlide';
import LandingPage from '@/pages/LandingPage';

const slides = [
  {
    imageSrc: onboardingTravel,
    title: '버킷리스트 작성',
    description:
      '"꿈을 적는 순간, 새로운 여정이 시작됩니다"\n버킷리스트를 작성하고 관리해 보세요',
  },
  {
    imageSrc: onboardingMoneyBox,
    title: '머니박스 기능',
    description:
      '"버킷리스트를 이루기 위한 저금통"\n편리하게 목표 금액을 모아보세요',
  },
  {
    imageSrc: onboardingHouse,
    title: '가족 연결',
    description:
      '"가족과 함께 이루는 꿈"\n사진으로 추억을 남기고, 후원으로 서로를 응원하세요',
  },
];

const OnboardingWrapper = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  if (!showOnboarding) return <LandingPage />;

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      swiperRef.current?.slideNext();
    } else {
      setShowOnboarding(false);
    }
  };

  const handleDotClick = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="bg-background flex h-full flex-col">
      <div className="flex-1">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          spaceBetween={24}
          slidesPerView={1}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <IntroSlide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-center justify-center space-y-20 pb-8">
        <DotIndicator
          total={slides.length}
          current={currentIndex}
          onDotClick={handleDotClick}
        />

        <div className="w-[90%]">
          <Button
            label={currentIndex === slides.length - 1 ? '시작하기' : '다음'}
            intent="green"
            size="full"
            onClick={handleNext}
            className="!font-hana-bold !h-11 !text-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingWrapper;
