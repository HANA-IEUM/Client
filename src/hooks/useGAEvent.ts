import { event } from '@/lib/ga';

export function useGAEvent(category: string) {
  return (action: string, label?: string, value?: number) => {
    event({
      action,
      category,
      label: label ?? '',
      value,
    });
  };
}
