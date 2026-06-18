import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CloudSun, Droplets, Wind, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherWidgetProps {
  compact?: boolean;
}

export default function WeatherWidget({ compact = false }: WeatherWidgetProps) {
  const { t } = useTranslation();

  if (compact) {
    return (
      <Link
        to="/weather"
        className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 p-4 transition-all hover:shadow-md active:scale-[0.98]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
          <CloudSun className="h-7 w-7 text-sky-500" />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-foreground">32°C</p>
          <p className="text-[11px] text-muted-foreground">Partly Cloudy • Guntur</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Droplets className="h-3.5 w-3.5" /> 65%
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/weather"
      className="block rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-sky-100 p-5 transition-all hover:shadow-lg active:scale-[0.98]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            {t("weather.title")} • Guntur, AP
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground tracking-tight">
              32
            </span>
            <span className="text-lg font-medium text-muted-foreground">°C</span>
          </div>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Partly Cloudy • {t("weather.feelsLike")} 34°C
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/15">
          <CloudSun className="h-8 w-8 text-sky-500" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-sky-100 pt-3">
        <StatItem icon={Droplets} label={t("weather.humidity")} value="65%" />
        <StatItem icon={Wind} label={t("weather.wind")} value="12 km/h" />
        <StatItem icon={Thermometer} label={t("weather.rainfall")} value="2.4 mm" />
      </div>
    </Link>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="text-[11px] font-semibold text-foreground">{value}</span>
    </div>
  );
}
