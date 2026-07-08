import { useState } from "react";

import Header from "./Header";
import OHLCTable from "./OHLCTable";
import AnalysisPanel from "./AnalysisPanel";
import ChartPanel from "./ChartPanel";

export default function Dashboard() {

  // OHLC Data

  const [rows, setRows] = useState([
  {
    time: "",
    open: "",
    high: "",
    low: "",
    close: "",
    volume: "",
  },
]);

  // AI Analysis
  const [analysis, setAnalysis] = useState({
    prediction: "Waiting...",
    confidence: 0,
    reasons: [],
    nextCandle: null,
    entry: null,
    stopLoss: null,
    target1: null,
    target2: null,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Header />

      <div className="mx-auto max-w-7xl p-6">

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Left Side */}
          <div className="xl:col-span-2">

            <OHLCTable
              rows={rows}
              setRows={setRows}
              setAnalysis={setAnalysis}
            />

          </div>

          {/* Right Side */}
          <AnalysisPanel
            analysis={analysis}
          />

        </div>

        {/* Bottom Chart */}

        <div className="mt-6">

          <ChartPanel
          rows={rows}
          analysis={analysis}
/>

        </div>

      </div>

    </div>
  );
}