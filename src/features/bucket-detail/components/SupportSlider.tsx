import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

type Cheer = { id: string; text: string; author: string };

interface SupportSliderProps {
  items?: Cheer[];
}

interface CheerCardProps {
  id: string | number;
  text: string;
  author: string;
  color: string;
}

export default function SupportSlider({ items }: SupportSliderProps) {
  return (
    <div
      className="mt-3 relative !overflow-visible [&_.swiper-pagination]:static [&_.swiper-pagination]:mt-4 pb-2"
      style={
        {
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': 'rgba(255,255,255,0.5)',
          '--swiper-pagination-bullet-size': '8px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        } as React.CSSProperties & Record<string, string>
      }
    >
      <Swiper
        modules={[Pagination]}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={18}
        slidesOffsetBefore={12}
        slidesOffsetAfter={12}
        grabCursor
        className="!overflow-visible"
      >
        {items?.map((c) => (
          <SwiperSlide
            key={c.id}
            className="!w-[280px] !h-[280px] scale-90 transition-transform duration-700 ease-in-out [&.swiper-slide-active]:scale-105"
          >
            <CheerCard
              id={c.id}
              text={c.text}
              author={c.author}
              color={'green'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function CheerCard({ id, text, author, color }: CheerCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/support/${id}`);
  };
  return (
    <article
      onClick={handleClick}
      className="w-full h-full aspect-square rounded-[32px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
    >
      <div
        className={`h-12 ${color === 'PINK' ? 'bg-icon-pink' : color === 'BLUE' ? 'bg-icon-blue' : 'bg-icon-green'} shrink-0`}
      />
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <p className="whitespace-pre-line text-center text-2xl leading-snug font-hana-bold text-neutral-700">
          {text}
        </p>
        <p className="mt-4 text-center text-2xl font-hana-bold text-neutral-500">
          –{author}–
        </p>
      </div>
    </article>
  );
}
