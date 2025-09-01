import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
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
      className="mt-3 relative !overflow-visible [&_.swiper-pagination]:static [&_.swiper-pagination]:mt-4 pb-2"
      style={
        {
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': 'rgba(255,255,255,0.5)',
        } as React.CSSProperties
      }
    >
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full h-[132px] bg-neutral-200" />

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
        className="!overflow-visible relative z-10"
      >
        {colors.map((color) => (
          <SwiperSlide
            key={color}
            className="!w-[293px] !h-[298px] scale-90 transition-transform duration-700 ease-in-out [&.swiper-slide-active]:scale-105"
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
    <article className="w-full h-full aspect-square rounded-[32px] bg-white shadow overflow-hidden flex flex-col">
      <div className={`h-12 ${bar}`} />
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <p className="whitespace-pre-line text-center text-2xl font-hana-bold">
          {text}
        </p>
        <p className="mt-4 text-center text-2xl font-hana-bold text-neutral-500">
          –{author}–
        </p>
      </div>
    </article>
  );
}
