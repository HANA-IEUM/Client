type CheckIconProps = {
  selected: boolean;
};

export default function CheckIcon({ selected = false }: CheckIconProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15.7639L11.1539 21.875L25 8.125"
        stroke={selected ? 'var(--color-accent-primary)' : '#CFCFCF'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
