import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText, CheckCircle2, XCircle, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", labelKey: "community.all" },
  { key: "insurance", labelKey: "schemes.categories.insurance" },
  { key: "loans", labelKey: "schemes.categories.loans" },
  { key: "subsidies", labelKey: "schemes.categories.subsidies" },
  { key: "pmKisan", labelKey: "schemes.categories.pmKisan" },
  { key: "irrigation", labelKey: "schemes.categories.irrigation" },
];

const demoSchemes = [
  {
    id: "1",
    name_te: "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)",
    category: "pmKisan",
    benefit: "₹6,000/సంవత్సరం",
    deadline: "2026-07-31",
    description: "చిన్న, సన్నకారు రైతులకు సంవత్సరానికి ₹6,000 ఆర్థిక సహాయం. మూడు విడతలుగా ₹2,000 చొప్పున నేరుగా బ్యాంకు ఖాతాలో జమ చేయబడుతుంది.",
    eligibility: ["భూమి ఉన్న రైతు కుటుంబం", "2 హెక్టార్ల వరకు సాగు భూమి", "ఆధార్ లింక్ చేసిన బ్యాంకు ఖాతా"],
  },
  {
    id: "2",
    name_te: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)",
    category: "insurance",
    benefit: "పంట నష్టం పూర్తి రక్షణ",
    deadline: "2026-07-15",
    description: "ప్రకృతి వైపరీత్యాలు, తుఫాన్లు, వరదలు, కరువు వల్ల పంట నష్టం జరిగితే బీమా రక్షణ కల్పించే పథకం.",
    eligibility: ["అన్ని రకాల రైతులు", "నోటిఫైడ్ పంటలు సాగు చేస్తున్నవారు", "బ్యాంకు ఖాతా ద్వారా రుణం ఉన్నవారు"],
  },
  {
    id: "3",
    name_te: "రైతు బంధు పథకం (తెలంగాణ)",
    category: "subsidies",
    benefit: "₹5,000/ఎకరా/సీజన్",
    deadline: "2026-12-31",
    description: "తెలంగాణ ప్రభుత్వం రైతులకు పంట పెట్టుబడి సహాయంగా ఎకరాకు ₹5,000 చొప్పున సంవత్సరానికి రెండు సీజన్లలో అందించే పథకం.",
    eligibility: ["తెలంగాణ రాష్ట్ర రైతులు", "భూమి యజమాని అయి ఉండాలి", "పట్టాదార్ పాస్ బుక్ కలిగి ఉండాలి"],
  },
  {
    id: "4",
    name_te: "వైఎస్సార్ రైతు భరోసా (ఆంధ్రప్రదేశ్)",
    category: "subsidies",
    benefit: "₹13,500/సంవత్సరం",
    deadline: "2026-12-31",
    description: "ఆంధ్రప్రదేశ్ ప్రభుత్వం రైతులకు పంట పెట్టుబడి సహాయంగా అందించే ఆర్థిక సహాయ పథకం.",
    eligibility: ["ఆంధ్రప్రదేశ్ రైతులు", "సాగు భూమి కలిగి ఉండాలి", "ఆధార్ లింక్ అయి ఉండాలి"],
  },
  {
    id: "5",
    name_te: "కిసాన్ క్రెడిట్ కార్డ్ (KCC)",
    category: "loans",
    benefit: "₹3,00,000 వరకు రుణం",
    deadline: "2026-12-31",
    description: "రైతులకు పంట ఖర్చులు, వ్యవసాయ అవసరాల కోసం తక్కువ వడ్డీకి రుణం అందించే పథకం. 4% వడ్డీ రాయితీ.",
    eligibility: ["అన్ని రకాల రైతులు", "బ్యాంకు ఖాతా ఉండాలి", "భూమి పత్రాలు ఉండాలి"],
  },
  {
    id: "6",
    name_te: "ప్రధాన మంత్రి కృషి సించాయీ యోజన (PMKSY)",
    category: "irrigation",
    benefit: "నీటిపారుదల సబ్సిడీ",
    deadline: "2026-12-31",
    description: "ప్రతి పొలానికి నీరు అందించే లక్ష్యంతో బిందు సేద్యం, స్ప్రింక్లర్లు, ఫార్మ్ పాండ్‌లకు సబ్సిడీ అందించే పథకం.",
    eligibility: ["చిన్న, సన్నకారు రైతులు", "నీటిపారుదల సౌకర్యం లేని ప్రాంతాలు", "సమూహంగా దరఖాస్తు చేస్తే ప్రాధాన్యత"],
  },
];

export default function SchemesPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showEligibility, setShowEligibility] = useState(false);
  const [eligibilityForm, setEligibilityForm] = useState({
    landArea: "",
    crop: "",
    income: "",
    district: "",
  });
  const [eligibilityResult, setEligibilityResult] = useState<"eligible" | "notEligible" | null>(null);

  const filtered = activeCategory === "all"
    ? demoSchemes
    : demoSchemes.filter((s) => s.category === activeCategory);

  const checkEligibility = () => {
    // Simple demo logic
    if (eligibilityForm.landArea && Number(eligibilityForm.landArea) > 0) {
      setEligibilityResult("eligible");
    } else {
      setEligibilityResult("notEligible");
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Eligibility Checker */}
      <button
        onClick={() => {
          setShowEligibility(!showEligibility);
          setEligibilityResult(null);
        }}
        className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-4 transition-all hover:shadow-md"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-indigo-800">{t("schemes.checkEligibility")}</p>
          <p className="text-[11px] text-indigo-600/70">
            {showEligibility ? "ఫారమ్ మూసివేయడానికి నొక్కండి" : "మీ అర్హతను తెలుసుకోండి"}
          </p>
        </div>
        <ChevronRight className={cn("h-5 w-5 text-indigo-400 transition-transform", showEligibility && "rotate-90")} />
      </button>

      {/* Eligibility Form */}
      {showEligibility && (
        <div className="rounded-2xl bg-card border border-border/40 p-5 space-y-3 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                భూమి విస్తీర్ణం (ఎకరాలు)
              </label>
              <input
                type="number"
                value={eligibilityForm.landArea}
                onChange={(e) => setEligibilityForm((f) => ({ ...f, landArea: e.target.value }))}
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                ప్రధాన పంట
              </label>
              <input
                type="text"
                value={eligibilityForm.crop}
                onChange={(e) => setEligibilityForm((f) => ({ ...f, crop: e.target.value }))}
                placeholder="e.g. వరి"
                className="w-full rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                వార్షిక ఆదాయం (₹)
              </label>
              <input
                type="number"
                value={eligibilityForm.income}
                onChange={(e) => setEligibilityForm((f) => ({ ...f, income: e.target.value }))}
                placeholder="e.g. 80000"
                className="w-full rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                జిల్లా
              </label>
              <select
                value={eligibilityForm.district}
                onChange={(e) => setEligibilityForm((f) => ({ ...f, district: e.target.value }))}
                className="w-full rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">జిల్లా ఎంచుకోండి</option>
                <option value="Guntur">గుంటూరు</option>
                <option value="Prakasam">ప్రకాశం</option>
                <option value="Krishna">కృష్ణా</option>
                <option value="Nellore">నెల్లూరు</option>
              </select>
            </div>
          </div>
          <button
            onClick={checkEligibility}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("schemes.checkEligibility")}
          </button>

          {eligibilityResult && (
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl p-3",
                eligibilityResult === "eligible"
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200",
              )}
            >
              {eligibilityResult === "eligible" ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">{t("schemes.eligible")}!</p>
                    <p className="text-[11px] text-emerald-600">
                      మీరు PM-KISAN, PMFBY, KCC పథకాలకు అర్హులు
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">{t("schemes.notEligible")}</p>
                    <p className="text-[11px] text-red-600">
                      దయచేసి అన్ని వివరాలు సరిగా నమోదు చేయండి
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Scheme Cards */}
      <div className="space-y-3">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="rounded-2xl bg-card border border-border/40 overflow-hidden transition-all hover:shadow-md"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        scheme.category === "pmKisan"
                          ? "bg-amber-50 text-amber-700"
                          : scheme.category === "insurance"
                            ? "bg-blue-50 text-blue-700"
                            : scheme.category === "loans"
                              ? "bg-purple-50 text-purple-700"
                              : scheme.category === "irrigation"
                                ? "bg-cyan-50 text-cyan-700"
                                : "bg-green-50 text-green-700",
                      )}
                    >
                      {t(`schemes.categories.${scheme.category}`)}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-[15px] font-bold text-foreground leading-snug">
                    {scheme.name_te}
                  </h3>
                  <p className="mt-2 text-[12px] text-foreground/80 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-3">
                <div className="flex-1">
                  <p className="text-[10px] text-muted-foreground">{t("schemes.benefitAmount")}</p>
                  <p className="text-sm font-bold text-primary">{scheme.benefit}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-[10px] text-muted-foreground">{t("schemes.deadline")}</p>
                  <p className="text-sm font-semibold text-foreground">{scheme.deadline}</p>
                </div>
              </div>

              <details className="mt-3 group">
                <summary className="text-[11px] font-medium text-primary cursor-pointer list-none">
                  అర్హత ప్రమాణాలు చూడండి ▾
                </summary>
                <ul className="mt-2 space-y-1">
                  {scheme.eligibility.map((e, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-foreground/70">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            <div className="border-t border-border/30 px-4 py-2.5 bg-muted/30">
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
                {t("schemes.applyNow")}
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
