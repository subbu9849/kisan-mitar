import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  CloudSun,
  Bug,
  ShoppingBag,
  FileText,
  Users,
  Store,
  Sprout,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import WeatherWidget from "@/components/WeatherWidget";

const quickActions = [
  { to: "/weather", icon: CloudSun, labelKey: "nav.weather", color: "bg-sky-500" },
  { to: "/crop-advisory", icon: Sprout, labelKey: "nav.farm", color: "bg-emerald-500" },
  { to: "/disease", icon: Bug, labelKey: "disease.title", color: "bg-orange-500" },
  { to: "/market", icon: ShoppingBag, labelKey: "nav.market", color: "bg-amber-500" },
  { to: "/schemes", icon: FileText, labelKey: "nav.schemes", color: "bg-indigo-500" },
  { to: "/experts", icon: Users, labelKey: "nav.experts", color: "bg-rose-500" },
  { to: "/marketplace", icon: Store, labelKey: "market.title", color: "bg-teal-500" },
  { to: "/farm", icon: Sprout, labelKey: "farmManager.title", color: "bg-lime-600" },
];

const demoAlerts = [
  { text: "మీ జిల్లాలో రేపు భారీ వర్షం సూచన — పంట కోత వాయిదా వేయండి", type: "weather" as const },
  { text: "వరి ధర ₹2200/క్వింటాల్‌కు పెరిగింది", type: "price" as const },
  { text: "PM కిసాన్ 15వ విడత దరఖాస్తు గడువు జూన్ 30", type: "scheme" as const },
];

const demoPosts = [
  {
    id: "1",
    author: "రమేష్ రెడ్డి",
    village: "తాడేపల్లి",
    content: "ఈ సీజన్‌లో నా వరి పంటకు SRI పద్ధతి ఉపయోగించాను. దిగుబడి 20% పెరిగింది! వివరాలు...",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "లక్ష్మి",
    village: "పొన్నూరు",
    content: "మిర్చి పంటకు పురుగు మందు గురించి సలహా కావాలి. దయచేసి సహాయం చేయండి.",
    likes: 15,
    comments: 12,
  },
  {
    id: "3",
    author: "వెంకటేష్",
    village: "సత్తెనపల్లి",
    content: "నేడు గుంటూరు మార్కెట్‌లో మిర్చి ధర ₹18,000 — గత నెలతో పోలిస్తే ₹2,000 పెరిగింది.",
    likes: 32,
    comments: 5,
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const farms = useAuthStore((s) => s.farms);

  const displayName = user?.name ?? "రైతు గారు";

  return (
    <div className="space-y-5 pb-6">
      {/* Greeting Card */}
      <div className="kisan-gradient rounded-2xl p-5 text-white shadow-lg shadow-primary/20">
        <p className="text-sm font-medium text-white/80">{t("app.greeting")},</p>
        <h2 className="mt-0.5 text-xl font-bold">{displayName}!</h2>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 rounded-xl bg-white/15 backdrop-blur-sm p-3">
            <p className="text-[11px] text-white/70">{t("dashboard.totalFarms")}</p>
            <p className="mt-0.5 text-lg font-bold">{farms.length || 1}</p>
          </div>
          <div className="flex-1 rounded-xl bg-white/15 backdrop-blur-sm p-3">
            <p className="text-[11px] text-white/70">{t("dashboard.activeCrops")}</p>
            <p className="mt-0.5 text-lg font-bold">
              {farms.reduce((sum, f) => sum + f.crops.length, 0) || 3}
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-white/15 backdrop-blur-sm p-3">
            <p className="text-[11px] text-white/70">{t("dashboard.thisMonth")}</p>
            <p className="mt-0.5 text-lg font-bold">₹12,500</p>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {t("dashboard.quickActions")}
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.to}
                to={action.to}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-card border border-border/40 p-3 transition-all duration-200 hover:shadow-md hover:border-primary/30 active:scale-95"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    action.color,
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                  {t(action.labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Alerts Banner */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">⚠️</span>
          <h3 className="text-sm font-semibold text-amber-800">
            {t("dashboard.alerts")}
          </h3>
        </div>
        <div className="space-y-2">
          {demoAlerts.map((alert, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg px-3 py-2 text-[12px] leading-relaxed",
                alert.type === "weather"
                  ? "bg-red-50 text-red-800"
                  : alert.type === "price"
                    ? "bg-green-50 text-green-800"
                    : "bg-blue-50 text-blue-800",
              )}
            >
              {alert.text}
            </div>
          ))}
        </div>
      </div>

      {/* Community Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            {t("dashboard.communityPreview")}
          </h3>
          <Link
            to="/community"
            className="flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
          >
            {t("common.viewAll")}
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {demoPosts.map((post) => (
            <Link
              key={post.id}
              to="/community"
              className="block rounded-2xl bg-card border border-border/40 p-4 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-[11px] font-bold text-primary">
                    {post.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-foreground">
                    {post.author}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {post.village}
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-foreground/80 leading-relaxed line-clamp-2">
                {post.content}
              </p>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
