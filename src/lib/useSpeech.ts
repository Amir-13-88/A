import { useCallback, useEffect, useRef, useState } from "react";

/** تلفظ صوتی واژه‌ها با Web Speech API */
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [supported]);

  const speak = useCallback(
    (text: string, rate = 0.82) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = rate;
      u.pitch = 1;
      const voices = synth.getVoices();
      const en =
        voices.find((v) => v.lang === "en-US" && /google/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (en) u.voice = en;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      synth.speak(u);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setSpeaking(false), 4000);
    },
    [supported],
  );

  return { speak, speaking, supported };
}
