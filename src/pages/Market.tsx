import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const demoPrices = [
  { id: "1", crop: "వరి (ధాన్యం)", cropEn: "Paddy", market: "గుంటూరు మార్కెట్ యార్డ్", district: "Guntur", modalPrice: 2180, minPrice: 2000, maxPrice: 2350, date: "2026-06-16", unit: "క్వింటాల్", trend: "up" as const },
  { id: "2", crop: "మిర్చి (ఎండు)", cropEn: "Dry Chili", market: "గుంటూరు మిర్చి యార్డ్", district: "Guntur", modalPrice: 18200, minPrice: 16500, maxPrice: 21000, date: "2026-06-16", unit: "క్వింటాల్", trend: "up" as const },
  { id: "3", crop: "పసుపు", cropEn: "Turmeric", market: "దుగ్గిరాల", district: "Guntur", modalPrice: 12500, minPrice: 11800, maxPrice: 13200, date: "2026-06-16", unit: "క్వింటాల్", trend: "down" as const },
  { id: "4", crop: "పత్తి", cropEn: "Cotton", market: "చిలకలూరిపేట", district: "Guntur", modalPrice: 7500, minPrice: 7200, maxPrice: 7900, date: "2026-06-16", unit: "క్వింటాల్", trend: "stable" as const },
  { id: "5", crop: "మొక్కజొన్న", cropEn: "Maize", market: "తెనాలి", district: "Guntur", modalPrice: 2100, minPrice: 1950, maxPrice: 2250, date: "2026-06-16", unit: "క్వింటాల్", trend: "up" as const },
  { id: "6", crop: "వేరుశనగ", cropEn: "Groundnut", market: "నరసరావుపేట", district: "Guntur", modalPrice: 6800, minPrice: 6500, maxPrice: 7200, date: "2026-06-16", unit: "క్వింటాల్", trend: "down" as const },
  { id: "7", crop: "జొన్న", cropEn: "Jowar", market: "సత్తెనపల్లి", district: "Guntur", modalPrice: 3200, minPrice: 3000, maxPrice: 3450, date: "2026-06-16", unit: "క్వింటాల్", trend: "stable" as const },
  { id: "8", crop: "మినుములు", cropEn: "Black Gram", market: "పొన్నూరు", district: "Guntur", modalPrice: 8500, minPrice: 8200, maxPrice: 8900, date: "2026-06-16", unit: "క్వింటాల్", trend: "up" as const },
];

const districts = ["Guntur", "Prakasam", "Krishna", "West Godavari", "East Godavari", "Nellore", "Kurnool"];

export default function MarketPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filtered = demoPrices.filter((p) => {
    const matchSearch = !search || p.crop.includes(search) || p.cropEn.toLowerCase().includes(search.toLowerCase());
    const matchDistrict = !selectedDistrict || p.district === selectedDistrict;
    return matchSearch && matchDistrict;
  });

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-red-500" />;
    return <Minus className="h-3.5 w-3.5 text-amber-500" />;
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("market.searchPlaceholder")}
            className="w-full rounded-xl border border-border/60 bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
        </div>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="rounded-xl border border-border/60 bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">{t("market.filterDistrict")}</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Price Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 text-muted-foreground/20" />
          <p className="mt-3 text-sm">{t("market.noData")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((price) => (
            <div
              key={price.id}
              className="rounded-2xl bg-card border border-border/40 p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">{price.crop}</h3>
                    <TrendIcon trend={price.trend} />
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{price.market}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    ₹{price.modalPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{t("market.perQuintal")}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4 border-t border-border/30 pt-3">
                <div className="flex-1">
                  <p className="text-[10px] text-muted-foreground">{t("market.minPrice")}</p>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{price.minPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex-1 border-l border-border/30 pl-4">
                  <p className="text-[10px] text-muted-foreground">{t("market.maxPrice")}</p>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{price.maxPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex-1 border-l border-border/30 pl-4">
                  <p className="text-[10px] text-muted-foreground">{t("market.date")}</p>
                  <p className="text-sm font-semibold text-foreground">{price.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
