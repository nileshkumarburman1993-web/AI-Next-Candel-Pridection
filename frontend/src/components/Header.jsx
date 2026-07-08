import { FaChartLine, FaRobot } from "react-icons/fa";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-cyan-600 p-3 shadow-lg shadow-cyan-500/30">
            <FaChartLine className="text-2xl text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              AI Candle Predictor
            </h1>

            <p className="text-sm text-slate-400">
              Smart OHLC Analysis using Gemini AI
            </p>
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-2">

          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>

          <FaRobot className="text-green-400" />

          <span className="font-medium text-green-400">
            AI Online
          </span>

        </div>

      </div>
    </header>
  );
}