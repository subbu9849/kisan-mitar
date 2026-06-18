import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Wheat, MapPin, User, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, type FarmerProfile } from "@/store/authStore";
import * as api from "@/services/api";

const andhraDistricts = [
  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa",
  "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam",
  "Visakhapatnam", "Vizianagaram", "West Godavari",
];

const telanganaDistricts = [
  "Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Kamareddy",
  "Karimnagar", "Khammam", "Mahabubabad", "Mahbubnagar", "Medak",
  "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet",
  "Nirmal", "Nizamabad", "Rangareddy", "Sangareddy", "Siddipet",
  "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban",
];

const languages = [
  { code: "te" as const, label: "తెలుగు" },
  { code: "hi" as const, label: "हिन्दी" },
  { code: "en" as const, label: "English" },
];

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [selectedState, setSelectedState] = useState<"Andhra Pradesh" | "Telangana">("Andhra Pradesh");
  const [district, setDistrict] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"te" | "hi" | "en">(
    (i18n.language?.split("-")[0] as "te" | "hi" | "en") ?? "te",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const districts = selectedState === "Andhra Pradesh" ? andhraDistricts : telanganaDistricts;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !village.trim() || !mandal.trim() || !district) {
      setError(t("auth.fillAllFields") ?? "Please fill all fields");
      return;
    }

    const token = localStorage.getItem("kisanseva_temp_token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const result = await api.registerFarmer(
        {
          name: name.trim(),
          village: village.trim(),
          mandal: mandal.trim(),
          district,
          state: selectedState,
          preferredLanguage,
        },
        token,
      );

      if (result.user) {
        const profile: FarmerProfile = {
          id: result.user.id,
          name: result.user.name,
          phone: result.user.phone,
          village: result.user.village,
          mandal: result.user.mandal,
          district: result.user.district,
          state: result.user.state,
          preferredLanguage: result.user.preferredLanguage,
          isVerified: result.user.isVerified,
        };
        setAuth(result.token, profile);
        i18n.changeLanguage(preferredLanguage);
        localStorage.setItem("kisanseva_lang", preferredLanguage);
        localStorage.removeItem("kisanseva_temp_token");
        localStorage.removeItem("kisanseva_temp_phone");
        navigate("/");
      }
    } catch {
      setError(t("auth.registerFailed") ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 via-green-50/40 to-amber-50/30">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 px-6 pt-6 pb-2">
        <button
          onClick={() => navigate("/login")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-border/40 shadow-sm hover:bg-white/80 transition-colors"
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-emerald-900">{t("auth.completeProfile") ?? "Complete Your Profile"}</h1>
          <p className="text-xs text-emerald-700/60">{t("auth.profileSubtitle") ?? "Tell us about your farm"}</p>
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 flex-1 px-6 pb-10">
        <div className="mx-auto max-w-sm rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                {t("auth.name")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("auth.namePlaceholder") ?? "Enter your full name"}
                className={cn(
                  "w-full rounded-xl border bg-white/80 py-3 px-4 text-sm font-medium",
                  "placeholder:text-muted-foreground/50",
                  "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                  "border-border/60 transition-all duration-200",
                )}
                autoFocus
              />
            </div>

            {/* Location fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("auth.village")}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={t("auth.villagePlaceholder") ?? "Village name"}
                  className={cn(
                    "w-full rounded-xl border bg-white/80 py-3 px-3 text-sm font-medium",
                    "placeholder:text-muted-foreground/50",
                    "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                    "border-border/60 transition-all duration-200",
                  )}
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("auth.mandal") ?? "Mandal"}
                </label>
                <input
                  type="text"
                  value={mandal}
                  onChange={(e) => setMandal(e.target.value)}
                  placeholder={t("auth.mandalPlaceholder") ?? "Mandal name"}
                  className={cn(
                    "w-full rounded-xl border bg-white/80 py-3 px-3 text-sm font-medium",
                    "placeholder:text-muted-foreground/50",
                    "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                    "border-border/60 transition-all duration-200",
                  )}
                />
              </div>
            </div>

            {/* State toggle */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                {t("auth.state") ?? "State"}
              </label>
              <div className="flex rounded-xl border border-border/60 bg-white/80 p-1">
                {(["Andhra Pradesh", "Telangana"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSelectedState(st);
                      setDistrict("");
                    }}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200",
                      selectedState === st
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {st === "Andhra Pradesh" ? "ఆంధ్ర ప్రదేశ్" : "తెలంగాణ"}
                  </button>
                ))}
              </div>
            </div>

            {/* District dropdown */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                {t("auth.district")}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={cn(
                  "w-full rounded-xl border bg-white/80 py-3 px-4 text-sm font-medium",
                  "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                  "border-border/60 transition-all duration-200 appearance-none",
                  !district && "text-muted-foreground/50",
                )}
              >
                <option value="" disabled>
                  {t("auth.selectDistrict") ?? "Select district"}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d} className="text-foreground">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Language preference */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                {t("auth.preferredLanguage") ?? "Preferred Language"}
              </label>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setPreferredLanguage(lang.code)}
                    className={cn(
                      "flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-all duration-200",
                      preferredLanguage === lang.code
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-border/60 bg-white/80 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-center text-xs font-medium text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200",
                "bg-emerald-600 text-white shadow-lg shadow-emerald-200/50",
                "hover:bg-emerald-700 active:scale-[0.98]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {loading ? (
                <Wheat className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t("auth.register")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
