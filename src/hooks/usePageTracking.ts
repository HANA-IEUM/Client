import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { pageview } from '@/lib/ga';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);
}
