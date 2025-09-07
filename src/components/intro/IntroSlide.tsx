interface IntroSlideProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function IntroSlide({
  imageSrc,
  title,
  description,
}: IntroSlideProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pb-20 text-center">
      <div className="mb-8 flex h-64 w-64 items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>

      <h1 className="font-hana-bold text-text-primary mb-5 text-4xl">
        {title}
      </h1>

      <div className="font-hana-regular text-text-secondary text-base">
        {description.split('\n').map((line, index) => (
          <p key={index} className="!mb-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
