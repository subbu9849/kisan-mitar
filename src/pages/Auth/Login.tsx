import { useState, useRef, useCallback, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, ArrowRight, RefreshCw, Wheat, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import * as api from "@/services/api";

const languages = [
  { code: "te" as const, label: "తెలుగు" },
  { code: "hi" as const, label: "हिन्दी" },
  { code: "en" as const, label: "English" },
];

type Step = "phone" | "otp";

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const currentLang = (i18n.language?.split("-")[0] ?? "te") as "te" | "hi" | "en";

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError(t("auth.invalidPhone") ?? "Please enter a valid 10-digit number");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await api.sendOtp(digits);
      setStep("otp");
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError(t("auth.otpFailed") ?? "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    const digits = phone.replace(/\D/g, "");
    setLoading(true);
    try {
      await api.sendOtp(digits);
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError(t("auth.otpFailed") ?? "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError(t("auth.invalidOtp") ?? "Enter the 6-digit OTP");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const digits = phone.replace(/\D/g, "");
      const result = await api.verifyOtp(digits, otpCode);

      if (result.isNewUser) {
        // Store temp token, navigate to register
        localStorage.setItem("kisanseva_temp_token", result.token);
        localStorage.setItem("kisanseva_temp_phone", digits);
        navigate("/register");
      } else if (result.user) {
        setAuth(result.token, result.user);
        navigate("/");
      }
    } catch {
      setError(t("auth.otpInvalid") ?? "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const editPhone = useCallback(() => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 via-green-50/40 to-amber-50/30">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
        <Wheat className="absolute top-8 left-6 h-8 w-8 text-emerald-300/40" />
        <Wheat className="absolute top-20 right-10 h-6 w-6 text-amber-300/30 -scale-x-100" />
        <Leaf className="absolute bottom-24 left-10 h-6 w-6 text-emerald-400/30" />
      </div>

      {/* Language switcher at top right */}
      <div className="relative z-10 flex justify-end px-4 pt-4">
        <div className="flex rounded-full border border-border/40 bg-white/60 backdrop-blur-md p-0.5 shadow-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200",
                currentLang === lang.code
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16">
        {/* Logo + Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-200/50">
            <Wheat className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-emerald-900">
            {t("app.name")}
          </h1>
          <p className="text-sm text-emerald-700/70">{t("app.tagline")}</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl">
          {step === "phone" ? (
            <form onSubmit={handleSendOtp}>
              <h2 className="mb-1 text-lg font-bold text-foreground">
                {t("auth.welcome") ?? "Welcome back"}
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                {t("auth.phonePrompt") ?? "Enter your mobile number to continue"}
              </p>

              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                {t("auth.phoneNumber")}
              </label>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-semibold text-foreground/70 pointer-events-none select-none">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    setError("");
                  }}
                  placeholder="98765 43210"
                  maxLength={11}
                  className={cn(
                    "w-full rounded-xl border bg-white/80 py-3.5 pl-20 pr-4 text-base font-medium tracking-wide",
                    "placeholder:text-muted-foreground/50",
                    "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                    error ? "border-red-400" : "border-border/60",
                    "transition-all duration-200",
                  )}
                  autoFocus
                />
              </div>

              {error && (
                <p className="mb-3 text-xs font-medium text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || phone.replace(/\D/g, "").length !== 10}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200",
                  "bg-emerald-600 text-white shadow-lg shadow-emerald-200/50",
                  "hover:bg-emerald-700 active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    {t("app.loading")}
                  </>
                ) : (
                  <>
                    {t("auth.sendOtp")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <h2 className="mb-1 text-lg font-bold text-foreground">
                {t("auth.enterOtp")}
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                {t("auth.otpSent") ?? "We sent a 6-digit code to"} +91{" "}
                {phone.replace(/\D/g, "").replace(/(\d{5})(\d{5})/, "$1 $2")}
                <button
                  type="button"
                  onClick={editPhone}
                  className="ml-1 text-emerald-600 font-medium underline underline-offset-2"
                >
                  {t("common.edit")}
                </button>
              </p>

              <div className="mb-5 flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={cn(
                      "h-14 w-12 rounded-xl border bg-white/80 text-center text-xl font-bold",
                      "focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                      error && otp.join("").length === 6 ? "border-red-400" : "border-border/60",
                      "transition-all duration-200",
                    )}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {error && (
                <p className="mb-3 text-center text-xs font-medium text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200",
                  "bg-emerald-600 text-white shadow-lg shadow-emerald-200/50",
                  "hover:bg-emerald-700 active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    {t("auth.verifying") ?? "Verifying..."}
                  </>
                ) : (
                  <>
                    {t("auth.verify")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                {t("auth.didntReceive") ?? "Didn't receive code?"}{" "}
                {resendTimer > 0 ? (
                  <span className="text-muted-foreground/60">
                    {resendTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                  >
                    {t("auth.resend") ?? "Resend"}
                  </button>
                )}
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          {t("auth.termsNotice") ?? "By continuing, you agree to our Terms and Privacy Policy"}
        </p>
      </div>
    </div>
  );
}
