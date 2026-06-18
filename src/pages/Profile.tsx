import { useTranslation } from "react-i18next";
import {
  User,
  MapPin,
  Phone,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Languages,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: User, label: "ప్రొఫైల్ సవరించు", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: MapPin, label: "నా పొలాలు", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Bell, label: "నోటిఫికేషన్ సెట్టింగ్‌లు", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Languages, label: "భాష మార్చండి", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Shield, label: "గోప్యత & భద్రత", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: HelpCircle, label: "సహాయం & మద్దతు", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: FileText, label: "నియమాలు & షరతులు", color: "text-gray-600", bg: "bg-gray-50" },
];

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuthStore();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("kisanseva_lang", lang);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <User className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-foreground">కిసాన్ సేవ</h2>
        <p className="mt-1 text-sm text-muted-foreground text-center">
          మీ ఖాతాలోకి లాగిన్ చేసి అన్ని సేవలు పొందండి
        </p>
        <button className="mt-6 w-full max-w-xs rounded-2xl bg-primary py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all">
          <Phone className="inline h-4 w-4 mr-2" />
          మొబైల్ నంబర్‌తో లాగిన్ చేయండి
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-6">
      {/* Profile Card */}
      <div className="rounded-2xl bg-card border border-border/40 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-2xl font-bold text-primary">
              {user?.name?.[0] ?? "ర"}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{user?.name ?? "రైతు గారు"}</h2>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>
                {user?.village ? `${user.village}, ${user.district}` : "గుంటూరు, ఆంధ్రప్రదేశ్"}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{user?.phone ?? "+91 9876543210"}</span>
            </div>
          </div>
          <button className="rounded-xl border border-border/60 p-2 hover:bg-muted transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border/30 pt-4">
          <StatBox value="1" label="పొలాలు" />
          <StatBox value="3" label="పంటలు" />
          <StatBox value="₹12.5K" label="లాభం" />
        </div>
      </div>

      {/* Language Switcher */}
      <div className="rounded-2xl bg-card border border-border/40 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("profile.language")}</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { code: "te", label: "తెలుగు" },
            { code: "hi", label: "हिन्दी" },
            { code: "en", label: "English" },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={cn(
                "rounded-xl py-2.5 text-sm font-medium transition-all",
                i18n.language?.split("-")[0] === lang.code
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="rounded-2xl bg-card border border-border/40 overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50",
                i < menuItems.length - 1 && "border-b border-border/20",
              )}
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", item.bg)}>
                <Icon className={cn("h-5 w-5", item.color)} />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-foreground">
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-50 border border-red-100 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors active:scale-[0.98]"
      >
        <LogOut className="h-4 w-4" />
        {t("auth.logout")}
      </button>

      {/* App Version */}
      <p className="text-center text-[10px] text-muted-foreground/50">
        కిసాన్ సేవ v1.0.0 • రైతుకు సేవ, దేశానికి శక్తి
      </p>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-muted/50 py-2">
      <span className="text-base font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
