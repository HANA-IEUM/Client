import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { event } from '@/lib/ga';

export function usePageStayTime() {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const stayTime = now - startTimeRef.current;

    if (startTimeRef.current !== now) {
      event({
        action: 'page_stay_time',
        category: 'engagement',
        label: location.pathname,
        value: Math.round(stayTime / 1000),
      });
    }

    startTimeRef.current = now;
  }, [location]);
}
