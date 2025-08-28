import type { HanaIconProps } from '@/types/common';

export default function HanaIcon({ size, width, height }: HanaIconProps) {
  const w = width ?? size ?? 43;
  const h = height ?? size ?? 43;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="21.5" cy="21.5" r="21.5" fill="#B0D9D9" />
      <rect
        width="32.7068"
        height="26.08"
        transform="matrix(0.999993 0.00381448 -0.00383934 0.999993 5.24146 8.41309)"
        fill="url(#pattern0_226_8093)"
      />
      <defs>
        <pattern
          id="pattern0_226_8093"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_226_8093"
            transform="scale(0.00653595 0.00819672)"
          />
        </pattern>
        <image
          id="image0_226_8093"
          width="153"
          height="122"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
