import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  preferredLanguage: "te" | "hi" | "en";
  profilePhoto?: string;
  isVerified: boolean;
}

export interface Farm {
  farmId: string;
  name: string;
  area: number;
  areaUnit: "acres" | "hectares";
  location: { lat: number; lng: number };
  soilType: string;
  irrigationType: string;
  crops: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: FarmerProfile | null;
  farms: Farm[];
  selectedFarmId: string | null;
  setAuth: (token: string, user: FarmerProfile) => void;
  setFarms: (farms: Farm[]) => void;
  setSelectedFarm: (farmId: string) => void;
  updateProfile: (updates: Partial<FarmerProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      farms: [],
      selectedFarmId: null,
      setAuth: (token: string, user: FarmerProfile) =>
        set({ isAuthenticated: true, token, user }),
      setFarms: (farms: Farm[]) =>
        set({ farms, selectedFarmId: farms[0]?.farmId ?? null }),
      setSelectedFarm: (farmId: string) => set({ selectedFarmId: farmId }),
      updateProfile: (updates: Partial<FarmerProfile>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      logout: () =>
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          farms: [],
          selectedFarmId: null,
        }),
    }),
    {
      name: "kisanseva-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        farms: state.farms,
        selectedFarmId: state.selectedFarmId,
      }),
    },
  ),
);
