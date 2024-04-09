'use client';

import { useEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|WPDesktop/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
};

export default useIsMobile;
