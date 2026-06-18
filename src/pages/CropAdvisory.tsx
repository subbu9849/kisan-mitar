import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sprout, Send, Leaf, Droplets, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const demoRecommendations = [
  {
    crop: "వరి (BPT-5204)",
    confidence: 92,
    yield: "25-28 క్వింటాళ్లు/ఎకరా",
    price: "₹2,000-2,200/క్వింటాల్",
    duration: "135-140 రోజులు",
  },
  {
    crop: "మిర్చి (Teja)",
    confidence: 88,
    yield: "18-22 క్వింటాళ్లు/ఎకరా",
    price: "₹16,000-20,000/క్వింటాల్",
    duration: "180-210 రోజులు",
  },
  {
    crop: "పసుపు (Duggirala)",
    confidence: 85,
    yield: "20-24 క్వింటాళ్లు/ఎకరా",
    price: "₹12,000-14,000/క్వింటాల్",
    duration: "210-240 రోజులు",
  },
];

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "నమస్కారం! నేను కిసాన్ మిత్ర AI సహాయకుడిని. మీ పంటలు, నేల, వాతావరణం గురించి నన్ను ఏదైనా అడగండి. నేను మీకు సలహా ఇస్తాను.",
  },
];

export default function CropAdvisoryPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500));
    const responses = [
      "వరి సాగుకు మీ ప్రాంతంలో ఇప్పుడు సరైన సమయం. BPT-5204 రకం మంచి దిగుబడి ఇస్తుంది. నారుమడి పోయడానికి జూన్ చివరి వారం అనుకూలం.",
      "మీ నేల pH స్థాయిని బట్టి, యూరియా కంటే DAP ఎరువు వాడటం మంచిది. ఎకరాకు 50 కేజీ DAP, 25 కేజీ పొటాష్ వేయండి.",
      "రాబోయే వారంలో వర్షం సూచన ఉన్నందున, ఈ వారం నీరు పెట్టవద్దు. వర్షం తర్వాత యూరియా టాప్ డ్రెస్సింగ్ చేయండి.",
    ];
    const reply = responses[Math.floor(Math.random() * responses.length)];
    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          🌾 మీ ప్రాంతానికి సిఫార్సు చేసిన పంటలు • ఖరీఫ్ 2026
        </h3>
        <div className="space-y-3">
          {demoRecommendations.map((rec, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card border border-border/40 p-4 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                    <Sprout className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{rec.crop}</h4>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {rec.confidence}% సిఫార్సు
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">
                  {rec.price}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Leaf className="h-3 w-3" />
                  {rec.yield}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {rec.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          🤖 కిసాన్ మిత్ర — AI సలహాదారు
        </h3>
        <div className="rounded-2xl bg-card border border-border/40 overflow-hidden">
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-lg"
                      : "bg-muted text-foreground rounded-bl-lg",
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-lg px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-border/30 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="మీ ప్రశ్న ఇక్కడ రాయండి..."
              className="flex-1 rounded-xl bg-muted/50 border border-border/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
