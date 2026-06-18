import { useTranslation } from "react-i18next";
import { CloudSun, Droplets, Wind, Thermometer, CloudRain, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const forecastDays = [
  { day: "ఆది", date: "Jun 16", tempMax: 34, tempMin: 26, condition: "Partly Cloudy", icon: CloudSun, rain: 10 },
  { day: "సోమ", date: "Jun 17", tempMax: 33, tempMin: 25, condition: "Scattered Showers", icon: CloudRain, rain: 60 },
  { day: "మంగళ", date: "Jun 18", tempMax: 30, tempMin: 24, condition: "Heavy Rain", icon: CloudRain, rain: 90 },
  { day: "బుధ", date: "Jun 19", tempMax: 31, tempMin: 25, condition: "Rain", icon: CloudRain, rain: 80 },
  { day: "గురు", date: "Jun 20", tempMax: 33, tempMin: 26, condition: "Partly Cloudy", icon: CloudSun, rain: 20 },
  { day: "శుక్ర", date: "Jun 21", tempMax: 35, tempMin: 27, condition: "Sunny", icon: CloudSun, rain: 5 },
  { day: "శని", date: "Jun 22", tempMax: 34, tempMin: 26, condition: "Clear", icon: CloudSun, rain: 0 },
];

const hourlyForecast = [
  { time: "6 AM", temp: 26, icon: CloudSun },
  { time: "9 AM", temp: 29, icon: CloudSun },
  { time: "12 PM", temp: 32, icon: CloudSun },
  { time: "3 PM", temp: 34, icon: CloudSun },
  { time: "6 PM", temp: 31, icon: CloudRain },
  { time: "9 PM", temp: 28, icon: CloudRain },
  { time: "12 AM", temp: 27, icon: CloudRain },
  { time: "3 AM", temp: 26, icon: CloudRain },
];

const alerts = [
  {
    type: "warning",
    title: "భారీ వర్షం హెచ్చరిక",
    message: "జూన్ 18-19 తేదీల్లో గుంటూరు జిల్లాలో భారీ వర్షాలు కురిసే అవకాశం ఉంది. పంట కోత వాయిదా వేయండి.",
  },
  {
    type: "info",
    title: "వడగళ్ల హెచ్చరిక",
    message: "ప్రకాశం జిల్లాలో వడగళ్ల వాన పడే అవకాశం. పంటలను రక్షించుకోండి.",
  },
];

export default function WeatherPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5 pb-6">
      {/* Current Conditions */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-sky-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{t("weather.title")} • Guntur, AP</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[64px] font-bold leading-none tracking-tight">32</span>
              <span className="text-2xl font-medium text-white/70">°C</span>
            </div>
            <p className="mt-1 text-sm text-white/80">Partly Cloudy</p>
            <p className="text-xs text-white/60">{t("weather.feelsLike")} 34°C</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <CloudSun className="h-10 w-10 text-white" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <WeatherStat icon={Droplets} label={t("weather.humidity")} value="65%" />
          <WeatherStat icon={Wind} label={t("weather.wind")} value="12 km/h" />
          <WeatherStat icon={Thermometer} label={t("weather.rainfall")} value="2.4 mm" />
        </div>
      </div>

      {/* Hourly Forecast */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("weather.hourly")}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {hourlyForecast.map((hour, i) => {
            const Icon = hour.icon;
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card px-4 py-3 min-w-[68px]",
                  i === 3 && "border-primary/40 bg-primary/5",
                )}
              >
                <span className="text-[11px] font-medium text-muted-foreground">{hour.time}</span>
                <Icon className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-bold text-foreground">{hour.temp}°</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("weather.forecast")}</h3>
        <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
          {forecastDays.map((day, i) => {
            const Icon = day.icon;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  i < forecastDays.length - 1 && "border-b border-border/30",
                )}
              >
                <div className="w-10">
                  <p className="text-xs font-semibold text-foreground">{day.day}</p>
                  <p className="text-[10px] text-muted-foreground">{day.date}</p>
                </div>
                <Icon
                  className={cn(
                    "h-5 w-5",
                    day.rain > 60 ? "text-blue-500" : day.rain > 20 ? "text-sky-400" : "text-amber-500",
                  )}
                />
                <span className="text-[11px] text-muted-foreground flex-1">{day.condition}</span>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Droplets className="h-3 w-3" />
                  <span>{day.rain}%</span>
                </div>
                <div className="flex items-center gap-2 w-20 justify-end">
                  <span className="text-xs font-semibold text-foreground">{day.tempMax}°</span>
                  <span className="text-xs text-muted-foreground">{day.tempMin}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("weather.alerts")}</h3>
        {alerts.length === 0 ? (
          <div className="rounded-2xl bg-card border border-border/50 p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground/30 mx-auto" />
            <p className="mt-2 text-sm text-muted-foreground">{t("weather.noAlerts")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border p-4",
                  alert.type === "warning"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={cn(
                      "h-4 w-4",
                      alert.type === "warning" ? "text-red-600" : "text-blue-600",
                    )}
                  />
                  <h4
                    className={cn(
                      "text-sm font-semibold",
                      alert.type === "warning" ? "text-red-700" : "text-blue-700",
                    )}
                  >
                    {alert.title}
                  </h4>
                </div>
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed",
                    alert.type === "warning" ? "text-red-600" : "text-blue-600",
                  )}
                >
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WeatherStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-white/15 backdrop-blur-sm py-2">
      <Icon className="h-4 w-4 text-white/70" />
      <span className="text-[10px] text-white/60">{label}</span>
      <span className="text-xs font-semibold text-white">{value}</span>
    </div>
  );
}
