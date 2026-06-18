import { useTranslation } from "react-i18next";
import { X, CheckCheck, Trash2 } from "lucide-react";
import { useNotificationStore, type Notification } from "@/store/notificationStore";
import { cn } from "@/lib/utils";

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const typeStyles: Record<Notification["type"], { bg: string; text: string; icon: string }> = {
  weather_alert: { bg: "bg-red-50", text: "text-red-700", icon: "⚠️" },
  price_alert: { bg: "bg-amber-50", text: "text-amber-700", icon: "💰" },
  scheme_deadline: { bg: "bg-blue-50", text: "text-blue-700", icon: "📋" },
  reminder: { bg: "bg-green-50", text: "text-green-700", icon: "📅" },
  disease_alert: { bg: "bg-orange-50", text: "text-orange-700", icon: "🦠" },
  community: { bg: "bg-purple-50", text: "text-purple-700", icon: "👥" },
};

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const { t } = useTranslation();
  const { notifications, markRead, markAllRead, clearAll } = useNotificationStore();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <h2 className="text-base font-bold">{t("notifications.title")}</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllRead}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
              title={t("notifications.markRead")}
            >
              <CheckCheck className="h-4 w-4" />
            </button>
            <button
              onClick={clearAll}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-destructive"
              title={t("notifications.clearAll")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-60px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <BellEmptyIcon />
              <p className="mt-3 text-sm">{t("common.noData")}</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const style = typeStyles[notif.type] ?? typeStyles.reminder;
              return (
                <button
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={cn(
                    "w-full border-b border-border/30 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                    !notif.read && "bg-primary/[0.03]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg">{style.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "text-sm font-semibold truncate",
                            !notif.read ? style.text : "text-foreground",
                          )}
                        >
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {notif.body}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground/70">
                        {new Date(notif.createdAt).toLocaleDateString(
                          i18nLocale(),
                          { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function BellEmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function i18nLocale(): string {
  try {
    const stored = localStorage.getItem("kisanseva_lang");
    return stored === "hi" ? "hi-IN" : stored === "en" ? "en-IN" : "te-IN";
  } catch {
    return "te-IN";
  }
}
