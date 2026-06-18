import { useState } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Header from "./Header";
import VoiceAssistant from "../VoiceAssistant";
import NotificationDrawer from "../NotificationDrawer";
import FallingLeaves from "../FallingLeaves";

export default function AppLayout() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Ambient falling leaves background */}
      <FallingLeaves />
      <Header onNotificationsClick={() => setShowNotifications(true)} />

      <main className="relative z-10 flex-1 overflow-y-auto pb-20">
        <div className="mx-auto max-w-lg px-4 py-4">
          <Outlet />
        </div>
      </main>

      <BottomNav />

      {/* Floating Voice Assistant FAB */}
      <VoiceAssistant />

      {/* Notification Drawer */}
      <NotificationDrawer
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
