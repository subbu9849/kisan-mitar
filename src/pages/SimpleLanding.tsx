import { Link } from "react-router-dom";
import VoiceAssistant from "../components/VoiceAssistant";

export default function SimpleLanding() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-50 to-amber-50 p-6">
      <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-8 shadow-lg text-center">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Kisan Mitra</h1>
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/dashboard"
            className="w-48 rounded-xl bg-emerald-600 px-4 py-2 text-center text-lg font-semibold text-white shadow-md hover:bg-emerald-700 transition"
          >
            Farmer
          </Link>
          <Link
            to="/market"
            className="w-48 rounded-xl bg-amber-600 px-4 py-2 text-center text-lg font-semibold text-white shadow-md hover:bg-amber-700 transition"
          >
            Market
          </Link>
          <VoiceAssistant />
        </div>
      </div>
    </div>
  );
}
