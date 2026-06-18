import { create } from "zustand";

export interface FarmLog {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  description: string;
  date: string;
  crop?: string;
  quantity?: number;
  unit?: string;
}

interface FarmState {
  logs: FarmLog[];
  addLog: (log: Omit<FarmLog, "id">) => void;
  deleteLog: (id: string) => void;
  getTotalExpenses: () => number;
  getTotalIncome: () => number;
  getNetProfit: () => number;
  getLogsByCrop: (crop: string) => FarmLog[];
}

export const useFarmStore = create<FarmState>()((set, get) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [
        { ...log, id: Date.now().toString(36) + Math.random().toString(36).slice(2) },
        ...state.logs,
      ],
    })),
  deleteLog: (id) =>
    set((state) => ({
      logs: state.logs.filter((l) => l.id !== id),
    })),
  getTotalExpenses: () => {
    return get()
      .logs.filter((l) => l.type === "expense")
      .reduce((sum, l) => sum + l.amount, 0);
  },
  getTotalIncome: () => {
    return get()
      .logs.filter((l) => l.type === "income")
      .reduce((sum, l) => sum + l.amount, 0);
  },
  getNetProfit: () => {
    const state = get();
    const income = state.logs
      .filter((l) => l.type === "income")
      .reduce((sum, l) => sum + l.amount, 0);
    const expenses = state.logs
      .filter((l) => l.type === "expense")
      .reduce((sum, l) => sum + l.amount, 0);
    return income - expenses;
  },
  getLogsByCrop: (crop: string) => {
    return get().logs.filter((l) => l.crop === crop);
  },
}));
