import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mic, MicOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const teluguCommands: Record<string, string> = {
  వాతావరణం: "/weather",
  వాతావరణ: "/weather",
  మార్కెట్: "/market",
  ధర: "/market",
  ధరలు: "/market",
  పొలం: "/farm",
  ఖర్చు: "/farm",
  ఖర్చులు: "/farm",
  వ్యాధి: "/disease",
  పంట: "/crop-advisory",
  సలహా: "/crop-advisory",
  సంఘం: "/community",
  పథకాలు: "/schemes",
  పథకం: "/schemes",
  నిపుణుడు: "/experts",
  నిపుణులు: "/experts",
};

const hindiCommands: Record<string, string> = {
  मौसम: "/weather",
  मंडी: "/market",
  बाजार: "/market",
  भाव: "/market",
  खेत: "/farm",
  खर्च: "/farm",
  रोग: "/disease",
  फसल: "/crop-advisory",
  सलाह: "/crop-advisory",
  समुदाय: "/community",
  योजना: "/schemes",
  योजनाएं: "/schemes",
};

const englishCommands: Record<string, string> = {
  weather: "/weather",
  market: "/market",
  price: "/market",
  prices: "/market",
  farm: "/farm",
  expense: "/farm",
  expenses: "/farm",
  disease: "/disease",
  crop: "/crop-advisory",
  advisory: "/crop-advisory",
  community: "/community",
  schemes: "/schemes",
  scheme: "/schemes",
  expert: "/experts",
};

export default function VoiceAssistant() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const langMap: Record<string, string> = {
    te: "te-IN",
    hi: "hi-IN",
    en: "en-IN",
  };

  const commandsMap: Record<string, Record<string, string>> = {
    te: teluguCommands,
    hi: hindiCommands,
    en: englishCommands,
  };

  const currentLang = i18n.language?.split("-")[0] ?? "te";
  const speechLang = langMap[currentLang] ?? "te-IN";

  const detectIntent = useCallback(
    (text: string): string | null => {
      const lower = text.toLowerCase();
      const commands = commandsMap[currentLang] ?? teluguCommands;
      for (const [keyword, route] of Object.entries(commands)) {
        if (lower.includes(keyword)) {
          return route;
        }
      }
      return null;
    },
    [currentLang],
  );

  const speakResponse = useCallback(
    (text: string) => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = speechLang;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    },
    [speechLang],
  );

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert(t("voice.notSupported") ?? "Voice not supported on this device");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = speechLang;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const text = result[0].transcript;
      setTranscript(text);

      if (result.isFinal) {
        setIsListening(false);
        handleVoiceInput(text);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
    setResponse("");
  }, [speechLang, t]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.abort();
    setIsListening(false);
  }, []);

  const handleVoiceInput = useCallback(
    async (text: string) => {
      const route = detectIntent(text);
      if (route) {
        setResponse(`📍 ${t("voice.navigating") ?? "Opening"}...`);
        setTimeout(() => {
          window.location.hash = `#${route}`;
          setIsOpen(false);
        }, 800);
        return;
      }

      setIsProcessing(true);
      setResponse("");

      try {
        const { aiChat } = await import("@/services/api");
        const result = await aiChat(
          text,
          currentLang,
        );
        const reply =
          currentLang === "en"
            ? result.reply_en
            : result.reply_te;
        setResponse(reply);
        speakResponse(reply);
      } catch {
        setResponse(t("app.error"));
      } finally {
        setIsProcessing(false);
      }
    },
    [currentLang, detectIntent, speakResponse, t],
  );

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const handleFabClick = () => {
    if (isOpen) {
      setIsOpen(false);
      stopListening();
      window.speechSynthesis?.cancel();
    } else {
      setIsOpen(true);
      setTimeout(startListening, 400);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={handleFabClick}
        className={cn(
          "fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          isOpen
            ? "bg-destructive text-destructive-foreground rotate-45 scale-90"
            : "kisan-gradient text-white hover:scale-105 active:scale-95",
        )}
        aria-label={isOpen ? t("common.cancel") : t("voice.tapToSpeak")}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </button>

      {/* Voice Assistant Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              setIsOpen(false);
              stopListening();
              window.speechSynthesis?.cancel();
            }}
          />

          <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col items-center px-4 pb-8 animate-in slide-in-from-bottom duration-300">
            <div className="w-full max-w-sm rounded-2xl bg-card border border-border/50 shadow-2xl p-6">
              {/* Pulse animation while listening */}
              {isListening && (
                <div className="flex justify-center mb-4">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-primary/20 voice-pulse-ring" />
                    <span
                      className="absolute inset-0 rounded-full bg-primary/20 voice-pulse-ring"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span
                      className="absolute inset-0 rounded-full bg-primary/20 voice-pulse-ring"
                      style={{ animationDelay: "1s" }}
                    />
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                      <Mic className="h-7 w-7 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              )}

              {!isListening && !response && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={startListening}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <Mic className="h-8 w-8 text-primary" />
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="h-1 w-1 rounded-full bg-primary animate-bounce voice-waveform-bar"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-center text-sm font-medium text-muted-foreground mb-1">
                {isListening
                  ? t("voice.listening")
                  : isProcessing
                    ? t("voice.processing")
                    : t("voice.speakNow")}
              </p>

              {transcript && (
                <p className="mt-2 text-center text-lg font-semibold text-foreground leading-relaxed">
                  &ldquo;{transcript}&rdquo;
                </p>
              )}

              {response && (
                <div className="mt-3 rounded-xl bg-primary/[0.06] border border-primary/10 p-3">
                  <p className="text-sm text-foreground leading-relaxed">{response}</p>
                </div>
              )}

              {/* Example commands */}
              {!isListening && !response && (
                <div className="mt-4 pt-3 border-t border-border/30">
                  <p className="text-[11px] font-medium text-muted-foreground mb-2">
                    {t("voice.examples")}:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["example1", "example2", "example3", "example4"].map((key) => (
                      <button
                        key={key}
                        onClick={() => handleVoiceInput(t(`voice.${key}`))}
                        className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {t(`voice.${key}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
