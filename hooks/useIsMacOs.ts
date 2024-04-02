import { useEffect, useState } from 'react';

const useIsMacOs = (): boolean => {
  const [isMacOs, setIsMacOs] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsMacOs(userAgent.includes('mac'));
  }, []);

  return isMacOs;
};

export default useIsMacOs;
