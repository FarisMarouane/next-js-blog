import { useEffect, useState } from "react";

const useIsFirefoxOrSafari = (): boolean => {
  const [isFirefoxOrSafari, setIsFirefoxOrSafari] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const firefoxOrSafariRegex = /Firefox|Safari/i;
    setIsFirefoxOrSafari(
      firefoxOrSafariRegex.test(userAgent) && !/Chrome/i.test(userAgent)
    );
  }, []);

  return isFirefoxOrSafari;
};

export default useIsFirefoxOrSafari;
