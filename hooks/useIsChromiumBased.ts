import { useEffect, useState } from "react";

const useIsChromiumBased = (): boolean => {
  const [isChromiumBased, setIsChromiumBased] = useState(false);
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const chromiumRegex = /Chrome|Edge|Opera/i;
    setIsChromiumBased(chromiumRegex.test(userAgent));
  }, []);
  return isChromiumBased;
};

export default useIsChromiumBased;
