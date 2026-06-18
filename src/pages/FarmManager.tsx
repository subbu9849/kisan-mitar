import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Plus, TrendingUp, TrendingDown, IndianRupee, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFarmStore, type FarmLog } from "@/store/farmStore";

const expenseCategories = [
  { key: "seed", icon: "🌱" },
  { key: "fertilizer", icon: "🧪" },
  { key: "labor", icon: "👨‍🌾" },
  { key: "water", icon: "💧" },
  { key: "pesticide", icon: "🧴" },
  { key: "other", icon: "📦" },
];

const incomeCategories = [
  { key: "sale", icon: "💰" },
  { key: "other", icon: "📦" },
];

export default function FarmManagerPage() {
  const { t } = useTranslation();
  const { logs, addLog, deleteLog, getTotalExpenses, getTotalIncome, getNetProfit } = useFarmStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"expenses" | "income">("expenses");
  const [form, setForm] = useState({
    type: "expense" as "expense" | "income",
    category: "seed",
    amount: "",
    description: "",
    crop: "",
    quantity: "",
    unit: "kg",
  });

  const filteredLogs = useMemo(
    () => logs.filter((l) => l.type === activeTab),
    [logs, activeTab],
  );

  const totalExpenses = getTotalExpenses();
  const totalIncome = getTotalIncome();
  const netProfit = getNetProfit();

  const handleSubmit = () => {
    if (!form.amount || !form.description) return;
    addLog({
      type: form.type,
      category: form.category,
      amount: Number(form.amount),
      description: form.description,
      date: new Date().toISOString().split("T")[0],
      crop: form.crop || undefined,
      quantity: form.quantity ? Number(form.quantity) : undefined,
      unit: form.unit || undefined,
    });
    setForm({
      type: "expense",
      category: "seed",
      amount: "",
      description: "",
      crop: "",
      quantity: "",
      unit: "kg",
    });
    setShowAddModal(false);
  };

  const categories = activeTab === "expenses" ? expenseCategories : incomeCategories;

  return (
    <div className="space-y-4 pb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard
          label={t("farmManager.totalSpent")}
          value={totalExpenses}
          icon={TrendingDown}
          color="text-red-600"
          bg="bg-red-50"
        />
        <SummaryCard
          label={t("farmManager.totalEarned")}
          value={totalIncome}
          icon={TrendingUp}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <SummaryCard
          label={t("farmManager.netProfit")}
          value={netProfit}
          icon={IndianRupee}
          color={netProfit >= 0 ? "text-primary" : "text-red-600"}
          bg={netProfit >= 0 ? "bg-primary/10" : "bg-red-50"}
        />
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-muted p-1">
        <button
          onClick={() => {
            setActiveTab("expenses");
            setForm((f) => ({ ...f, type: "expense", category: "seed" }));
          }}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
            activeTab === "expenses"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          {t("farmManager.expenses")}
        </button>
        <button
          onClick={() => {
            setActiveTab("income");
            setForm((f) => ({ ...f, type: "income", category: "sale" }));
          }}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
            activeTab === "income"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          {t("farmManager.income")}
        </button>
      </div>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <IndianRupee className="h-10 w-10 text-muted-foreground/20" />
          <p className="mt-3 text-sm">{t("common.noData")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-3 rounded-2xl bg-card border border-border/40 p-4"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl text-lg",
                  log.type === "expense" ? "bg-red-50" : "bg-emerald-50",
                )}
              >
                {categories.find((c) => c.key === log.category)?.icon ?? "📦"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {log.description}
                  </p>
                  {log.crop && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {log.crop}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {t(`farmManager.categories.${log.category}`)} • {log.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "text-sm font-bold",
                    log.type === "expense" ? "text-red-600" : "text-emerald-600",
                  )}
                >
                  {log.type === "expense" ? "-" : "+"}₹{log.amount.toLocaleString("en-IN")}
                </p>
                {log.quantity && (
                  <p className="text-[10px] text-muted-foreground">
                    {log.quantity} {log.unit}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteLog(log.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add FAB */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="fixed inset-x-4 bottom-4 z-40 rounded-2xl bg-card border border-border/50 shadow-2xl p-5 max-w-sm mx-auto animate-in slide-in-from-bottom duration-300">
            <h3 className="text-base font-bold text-foreground mb-4">
              {t("farmManager.addEntry")}
            </h3>

            <div className="space-y-3">
              {/* Category */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                  {t("farmManager.category")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setForm((f) => ({ ...f, category: cat.key }))}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-sm transition-all",
                        form.category === cat.key
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {cat.icon} {t(`farmManager.categories.${cat.key}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                  {t("farmManager.amount")}
                </label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  placeholder="0"
                  className="w-full rounded-xl border border-border/60 bg-muted/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                  {t("farmManager.description")}
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder={t("farmManager.description")}
                  className="w-full rounded-xl border border-border/60 bg-muted/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Crop (optional) */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                  {t("farmManager.crop")} ({t("common.cancel")})
                </label>
                <input
                  type="text"
                  value={form.crop}
                  onChange={(e) => setForm((f) => ({ ...f, crop: e.target.value }))}
                  placeholder="e.g. వరి, మిర్చి"
                  className="w-full rounded-xl border border-border/60 bg-muted/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border/60 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border/30 p-3", bg)}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={cn("h-3.5 w-3.5", color)} />
        <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
      </div>
      <p className={cn("text-base font-bold", color)}>
        ₹{value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
