import {
  FaArrowUp,
  FaArrowDown,
  FaBullseye,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function AnalysisPanel({ analysis }) {
  if (!analysis) {
    return (
      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          AI Analysis
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-500">
          Click <b className="mx-1 text-cyan-400">Analyze</b> to get prediction.
        </div>
      </div>
    );
  }

  const bullish =
    (analysis.prediction || "").toLowerCase().includes("bull");

  return (
    <div className="rounded-xl bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Prediction
      </h2>

      <div
        className={`mb-6 rounded-xl p-5 ${
          bullish
            ? "bg-green-900/30 border border-green-500"
            : "bg-red-900/30 border border-red-500"
        }`}
      >
        <div className="flex items-center gap-3">

          {bullish ? (
            <FaArrowUp className="text-3xl text-green-400" />
          ) : (
            <FaArrowDown className="text-3xl text-red-400" />
          )}

          <div>

            <p className="text-sm text-slate-400">
              Prediction
            </p>

            <h3 className="text-2xl font-bold">
              {analysis.prediction || "Unknown"}
            </h3>

          </div>

        </div>
      </div>

      <div className="space-y-4">

        <div className="rounded-lg bg-slate-800 p-4">

          <p className="text-slate-400">
            Confidence
          </p>

          <h3 className="text-xl font-bold text-cyan-400">
            {analysis.confidence || 0}%
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <FaBullseye className="text-green-400" />

            <span>Entry</span>

          </div>

          <h3 className="mt-2 text-xl font-bold">
            {analysis.entry ?? "-"}
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <FaShieldAlt className="text-red-400" />

            <span>Stop Loss</span>

          </div>

          <h3 className="mt-2 text-xl font-bold">
            {analysis.stopLoss ?? "-"}
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-4">

          <p className="mb-3 font-semibold">
            Targets
          </p>

          <div className="space-y-2">

            <div className="flex justify-between">

              <span>T1</span>

              <span className="font-bold text-green-400">
                {analysis.target1 ?? "-"}
              </span>

            </div>

            <div className="flex justify-between">

              <span>T2</span>

              <span className="font-bold text-green-400">
                {analysis.target2 ?? "-"}
              </span>

            </div>

          </div>

        </div>

        <div className="rounded-lg bg-slate-800 p-4">

          <p className="mb-3 font-semibold">
            AI Reasons
          </p>

          <ul className="space-y-2">

            {(analysis.reasons || []).map((reason, index) => (

              <li
                key={index}
                className="flex items-start gap-2"
              >

                <FaCheckCircle className="mt-1 text-green-400" />

                <span className="text-slate-300">
                  {reason}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}