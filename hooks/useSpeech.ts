import { useEffect, useState } from "react";

const useSpeech = (text: string, locale: string | undefined) => {
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    if (!speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === "fr" ? "fr-FR" : "en-US";

    // Start speaking
    if (speak) {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
        return;
      }
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
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
