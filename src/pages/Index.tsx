import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-50 to-amber-50">
      <div className="flex flex-col gap-6">
        <Link
          to="/"
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
};

export default Index;

