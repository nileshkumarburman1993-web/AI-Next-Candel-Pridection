import React from "react";
import Chart from "react-apexcharts";

export default function CandleChart({ rows }) {

  const series = [
    {
      data: rows
        .filter(
          r =>
            r.open !== "" &&
            r.high !== "" &&
            r.low !== "" &&
            r.close !== ""
        )
        .map((r, index) => ({
          x: index + 1,
          y: [
            Number(r.open),
            Number(r.high),
            Number(r.low),
            Number(r.close),
          ],
        })),
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      background: "#0f172a",
      toolbar: {
        show: true,
      },
    },

    theme: {
      mode: "dark",
    },

    xaxis: {
      type: "category",
    },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl text-white font-bold mb-6">
        Candlestick Chart
      </h2>

      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
}