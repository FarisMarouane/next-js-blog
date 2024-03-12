import { useEffect, useState } from "react";

const useIsFirefox = (): boolean => {
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsFirefox(userAgent.includes("Firefox"));
  }, []);

  return isFirefox;
};

export default useIsFirefox;
