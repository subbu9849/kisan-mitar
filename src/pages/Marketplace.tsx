import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Store, Package, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "అన్నీ" },
  { key: "seed", label: "విత్తనాలు" },
  { key: "fertilizer", label: "ఎరువులు" },
  { key: "pesticide", label: "పురుగుమందులు" },
  { key: "tool", label: "పరికరాలు" },
];

const demoProducts = [
  { id: "1", name: "BPT-5204 వరి విత్తనాలు", category: "seed", brand: "పైయొనీర్", price: 850, unit: "10 కేజీ", rating: 4.5, stock: 200, image: "🌾" },
  { id: "2", name: "DAP ఎరువు", category: "fertilizer", brand: "IFFCO", price: 1350, unit: "50 కేజీ బ్యాగ్", rating: 4.7, stock: 500, image: "🧪" },
  { id: "3", name: "క్లోరిపైరిఫాస్ 20% EC", category: "pesticide", brand: "ధనుక", price: 420, unit: "500 ml", rating: 4.3, stock: 150, image: "🧴" },
  { id: "4", name: "మిర్చి హైబ్రిడ్ విత్తనాలు", category: "seed", brand: "మహింద్రా", price: 3200, unit: "100 గ్రా ప్యాకెట్", rating: 4.6, stock: 80, image: "🌶️" },
  { id: "5", name: "యూరియా 46%", category: "fertilizer", brand: "KRIBHCO", price: 267, unit: "50 కేజీ బ్యాగ్", rating: 4.4, stock: 1000, image: "⚗️" },
  { id: "6", name: "స్ప్రేయర్ (బ్యాటరీ)", category: "tool", brand: "కిసాన్ క్రాఫ్ట్", price: 2800, unit: "1 యూనిట్", rating: 4.2, stock: 25, image: "🔫" },
  { id: "7", name: "పొటాష్ (MOP)", category: "fertilizer", brand: "IFFCO", price: 850, unit: "50 కేజీ బ్యాగ్", rating: 4.5, stock: 300, image: "🪨" },
  { id: "8", name: "వేరుశనగ విత్తనాలు", category: "seed", brand: "Nuziveedu", price: 1100, unit: "10 కేజీ", rating: 4.4, stock: 120, image: "🥜" },
];

export default function MarketplacePage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);

  const filtered = activeCategory === "all"
    ? demoProducts
    : demoProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-4 pb-6">
      {/* Header with Cart */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100">
            <Store className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">కిసాన్ మార్కెట్</h2>
            <p className="text-[10px] text-muted-foreground">విత్తనాలు, ఎరువులు, పురుగుమందులు</p>
          </div>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted hover:bg-primary/10 transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat.key
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-card border border-border/40 overflow-hidden transition-all hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-28 items-center justify-center bg-muted/50 text-5xl">
              {product.image}
            </div>
            <div className="p-3">
              <p className="text-[11px] font-medium text-muted-foreground">{product.brand}</p>
              <h3 className="mt-0.5 text-[13px] font-bold text-foreground leading-snug line-clamp-2">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-medium text-muted-foreground">{product.rating}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">₹{product.price}</p>
                  <p className="text-[10px] text-muted-foreground">{product.unit}</p>
                </div>
                <button
                  onClick={() => setCartCount((c) => c + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white hover:bg-teal-700 active:scale-90 transition-all"
                >
                  <Package className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
