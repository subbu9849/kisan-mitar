import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/notificationStore";

const languages = [
  { code: "te", label: "తెలుగు" },
  { code: "hi", label: "हिन्दी" },
  { code: "en", label: "English" },
] as const;

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNotificationsClick?: () => void;
}

export default function Header({
  title,
  showBack,
  onBack,
  onNotificationsClick,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const currentLang = i18n.language?.split("-")[0] ?? "te";

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("kisanseva_lang", code);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl safe-area-top">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">
                {title ?? t("app.name")}
              </h1>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {t("app.tagline")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex rounded-lg border border-border/60 bg-muted/50 p-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={cn(
                  "px-2 py-1 text-[11px] font-medium rounded-md transition-all duration-200",
                  currentLang === lang.code
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={onNotificationsClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label={t("notifications.title")}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
