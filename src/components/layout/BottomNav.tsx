import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  CloudSun,
  ShoppingBag,
  Sprout,
  Users,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, labelKey: "nav.home" },
  { to: "/weather", icon: CloudSun, labelKey: "nav.weather" },
  { to: "/market", icon: ShoppingBag, labelKey: "nav.market" },
  { to: "/farm", icon: Sprout, labelKey: "nav.farm" },
  { to: "/community", icon: Users, labelKey: "nav.community" },
];

export default function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur-xl bottom-nav-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] rounded-xl transition-all duration-200",
                "touch-target relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full bg-primary" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110",
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-tight",
                  isActive && "font-semibold",
                )}
              >
                {t(item.labelKey)}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
