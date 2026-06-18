import { Link } from "react-router-dom";

export default function SimpleLanding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-amber-50">
      <h1 className="mb-8 text-3xl font-bold text-emerald-900">Kisan Mitra</h1>
      <div className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="rounded-xl bg-emerald-600 px-8 py-4 text-center text-xl font-semibold text-white shadow-lg hover:bg-emerald-700"
        >
          Farmer
        </Link>
        <Link
          to="/market"
          className="rounded-xl bg-amber-600 px-8 py-4 text-center text-xl font-semibold text-white shadow-lg hover:bg-amber-700"
        >
          Market
        </Link>
      </div>
    </div>
  );
}
