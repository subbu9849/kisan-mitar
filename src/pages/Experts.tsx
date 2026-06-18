import { useTranslation } from "react-i18next";
import { Star, Phone, Calendar, GraduationCap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const demoExperts = [
  {
    id: "1",
    name: "డా. శ్రీనివాస్ రావు",
    specialization: "వరి, మొక్కజొన్న",
    languages: ["తెలుగు", "హిందీ", "ఇంగ్లీష్"],
    experience: "25 సంవత్సరాలు",
    qualification: "Ph.D. వ్యవసాయ శాస్త్రం",
    location: "గుంటూరు",
    rating: 4.8,
    consultations: 1240,
    fee: 200,
    available: true,
  },
  {
    id: "2",
    name: "శ్రీమతి లక్ష్మి దేవి",
    specialization: "మిర్చి, పసుపు, వేరుశనగ",
    languages: ["తెలుగు", "ఇంగ్లీష్"],
    experience: "18 సంవత్సరాలు",
    qualification: "M.Sc. వ్యవసాయం",
    location: "తెనాలి",
    rating: 4.6,
    consultations: 856,
    fee: 150,
    available: true,
  },
  {
    id: "3",
    name: "డా. రమేష్",
    specialization: "పత్తి, జొన్న, సజ్జ",
    languages: ["తెలుగు", "హిందీ"],
    experience: "20 సంవత్సరాలు",
    qualification: "Ph.D. పంట రక్షణ",
    location: "చిలకలూరిపేట",
    rating: 4.9,
    consultations: 2100,
    fee: 250,
    available: false,
  },
  {
    id: "4",
    name: "సత్యనారాయణ",
    specialization: "నీటి యాజమాన్యం, బిందు సేద్యం",
    languages: ["తెలుగు"],
    experience: "15 సంవత్సరాలు",
    qualification: "B.Sc. వ్యవసాయం",
    location: "పొన్నూరు",
    rating: 4.5,
    consultations: 620,
    fee: 100,
    available: true,
  },
];

export default function ExpertsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 pb-6">
      <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 p-4">
        <p className="text-sm font-semibold text-rose-800">
          👨‍🌾 నిపుణుల సలహా పొందండి
        </p>
        <p className="mt-1 text-[12px] text-rose-600/80">
          మీ పంటలు, నేల, వ్యాధుల గురించి అనుభవజ్ఞులైన వ్యవసాయ నిపుణులతో నేరుగా మాట్లాడండి
        </p>
      </div>

      <div className="space-y-3">
        {demoExperts.map((expert) => (
          <div
            key={expert.id}
            className="rounded-2xl bg-card border border-border/40 overflow-hidden transition-all hover:shadow-md"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                  <span className="text-lg font-bold text-rose-600">
                    {expert.name.split(" ").pop()?.[0] ?? "E"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-bold text-foreground">{expert.name}</h3>
                    {expert.available ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                        అందుబాటులో
                      </span>
                    ) : (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        బిజీ
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    {expert.specialization}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      <GraduationCap className="h-3 w-3" />
                      {expert.qualification}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {expert.location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {expert.rating} ({expert.consultations})
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1">
                    {expert.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-3">
                <p className="text-sm font-bold text-primary">
                  ₹{expert.fee}/సెషన్
                </p>
                <span className="text-[11px] text-muted-foreground">
                  {expert.experience} అనుభవం
                </span>
                <div className="ml-auto flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-border/60 px-3 py-2 text-[12px] font-medium text-muted-foreground hover:bg-muted transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    కాల్
                  </button>
                  <button
                    disabled={!expert.available}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-all",
                      expert.available
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                        : "bg-muted text-muted-foreground cursor-not-allowed",
                    )}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    బుక్ చేయండి
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
