import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SimpleLanding from "@/pages/SimpleLanding";

import AppLayout from "@/components/AppLayout";
import { useAuthStore } from "@/store/authStore";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const WeatherPage = lazy(() => import("@/pages/Weather"));
const MarketPage = lazy(() => import("@/pages/Market"));
const DiseaseDetectionPage = lazy(() => import("@/pages/DiseaseDetection"));
const FarmManagerPage = lazy(() => import("@/pages/FarmManager"));
const CommunityPage = lazy(() => import("@/pages/Community"));
const SchemesPage = lazy(() => import("@/pages/Schemes"));
const CropAdvisoryPage = lazy(() => import("@/pages/CropAdvisory"));
const ExpertsPage = lazy(() => import("@/pages/Experts"));
const MarketplacePage = lazy(() => import("@/pages/Marketplace"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const LoginPage = lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = lazy(() => import("@/pages/Auth/Register"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth routes — no layout, no bottom nav */}
            <Route
              path="/login"
              element={
                <RedirectIfAuth>
                  <LoginPage />
                </RedirectIfAuth>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuth>
                  <RegisterPage />
                </RedirectIfAuth>
              }
            />

            {/* Simple landing and main routes wrapped in layout */}
            <Route element={<AppLayout />}>
              <Route index element={<SimpleLanding />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="weather" element={<WeatherPage />} />
              <Route path="market" element={<MarketPage />} />
              <Route path="disease" element={<DiseaseDetectionPage />} />
              <Route path="farm" element={<FarmManagerPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="schemes" element={<SchemesPage />} />
              <Route path="crop-advisory" element={<CropAdvisoryPage />} />
              <Route path="experts" element={<ExpertsPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
