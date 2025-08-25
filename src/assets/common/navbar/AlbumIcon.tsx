import type { IconProps } from '@/types/common';

export default function AlbumIcon({ active = false }: IconProps) {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 8C3.75 5.92894 5.42894 4.25 7.5 4.25H17.5C19.5711 4.25 21.25 5.92894 21.25 8V18C21.25 20.0711 19.5711 21.75 17.5 21.75H7.5C5.42894 21.75 3.75 20.0711 3.75 18V8Z"
        stroke={active ? 'var(--color-theme-primary)' : '#2E2E2E'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.25 9.25V23C26.25 25.0711 24.5711 26.75 22.5 26.75H8.75"
        stroke={active ? 'var(--color-theme-primary)' : '#2E2E2E'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 15.9686L8.33486 11.3837C8.82303 10.8955 9.61448 10.8955 10.1026 11.3837L13.5938 14.8748M13.5938 14.8748L16.538 11.9306C17.0261 11.4424 17.8176 11.4424 18.3057 11.9306L21.25 14.8748M13.5938 14.8748L16.0547 17.3358"
        stroke={active ? 'var(--color-theme-primary)' : '#2E2E2E'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
