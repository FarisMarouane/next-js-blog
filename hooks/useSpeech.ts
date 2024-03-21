import { useEffect, useState, useRef } from "react";

const useSpeech = (text: string, locale: string | undefined) => {
  const [speak, setSpeak] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | undefined>();
  const localeRef = useRef<string | undefined>(locale);

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = locale === "fr" ? "fr-FR" : "en-US";

    if (!speechSynthesis) return;

    // Detect change in locale/language
    if (
      (locale === "fr" && localeRef.current !== "fr") ||
      (locale === "en" && localeRef.current !== "en")
    ) {
      localeRef.current = locale;

      // The two lines below need to be in this exact order, otherwise speecheSynthesis remains in a indefinite paused state
      speechSynthesis.resume();
      speechSynthesis.cancel(); // The cancel method by itself keeps the speechSynthesis in a paused state

      setSpeak(false);
      return;
    }

    // Start speaking
    if (speak) {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
        return;
      }
      speechSynthesis.cancel();
      speechSynthesis.speak(utteranceRef.current);
    }

    // Pause speaking
    if (!speak) {
      if (speechSynthesis.speaking) {
        speechSynthesis.pause();
      }
    }
  }, [speak, text, locale]);

  const toggleSpeaking = () => {
    setSpeak(!speak);
  };

  return { isSpeaking: speak, toggleSpeaking };
};

export default useSpeech;
