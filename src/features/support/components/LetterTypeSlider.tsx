import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

type Color = 'PINK' | 'GREEN' | 'BLUE';

interface Props {
  value?: Color;
  onChange?: (color: Color) => void;
}

const AUTHOR = '딸';
const TEXT = '엄마의 꿈을 응원해요! 파이팅! 💗';

export default function LetterTypeSlider({ value = 'PINK', onChange }: Props) {
  const colors: Color[] = ['GREEN', 'PINK', 'BLUE'];
  const initialIndex = colors.indexOf(value);

  return (
    <div
      className="relative mt-3 !overflow-visible pb-2 [&_.swiper-pagination]:static [&_.swiper-pagination]:mt-4"
      style={
        {
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': 'rgba(255,255,255,0.5)',
        } as React.CSSProperties
      }
    >
      <div className="absolute top-24 left-1/2 h-[132px] w-full -translate-x-1/2 bg-neutral-200" />

      <Swiper
        modules={[Pagination]}
        initialSlide={initialIndex}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={18}
        grabCursor
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          const idx = swiper.activeIndex;
          onChange?.(colors[idx] ?? 'pink');
        }}
        className="relative z-10 !overflow-visible"
      >
        {colors.map((color) => (
          <SwiperSlide
            key={color}
            className="!h-[298px] !w-[293px] scale-90 transition-transform duration-700 ease-in-out [&.swiper-slide-active]:scale-105"
          >
            <CheerCard text={TEXT} author={AUTHOR} color={color} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function CheerCard({
  text,
  author,
  color,
}: {
  text: string;
  author: string;
  color: Color;
}) {
  const bar =
    color === 'PINK'
      ? 'bg-icon-pink'
      : color === 'BLUE'
        ? 'bg-icon-blue'
        : 'bg-icon-green';

  return (
    <article className="flex aspect-square h-full w-full flex-col overflow-hidden rounded-[32px] bg-white shadow">
      <div className={`h-12 ${bar}`} />
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <p className="font-hana-bold text-center text-2xl whitespace-pre-line">
          {text}
        </p>
        <p className="font-hana-bold mt-4 text-center text-2xl text-neutral-500">
          –{author}–
        </p>
      </div>
    </article>
  );
}
