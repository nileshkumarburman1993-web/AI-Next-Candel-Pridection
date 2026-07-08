import Chart from "react-apexcharts";

export default function ChartPanel({ rows = [], analysis }) {
  if (!rows.length) {
    return (
      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          Candlestick Chart
        </h2>

        <div className="flex h-[500px] items-center justify-center rounded-xl border border-slate-700 text-slate-500">
          Enter OHLC data to display chart
        </div>
      </div>
    );
  }

 const chartData = rows.map((c, i) => ({
  x: c.time || `Candle ${i + 1}`,
  y: [
    Number(c.open),
    Number(c.high),
    Number(c.low),
    Number(c.close),
  ],
}));

// ================= AI NEXT CANDLE =================

if (analysis?.nextCandle) {

  chartData.push({

    x: "NEXT",

    y: [

      Number(analysis.nextCandle.open),

      Number(analysis.nextCandle.high),

      Number(analysis.nextCandle.low),

      Number(analysis.nextCandle.close),

    ],

  });

}

const series = [
  {
    data: chartData,
  },
];

  const annotations = {
    yaxis: [],
  };

  if (analysis?.entry) {
    annotations.yaxis.push({
      y: Number(analysis.entry),
      borderColor: "#00E396",
      label: {
        text: "ENTRY",
        style: {
          background: "#00E396",
          color: "#fff",
        },
      },
    });
  }

  if (analysis?.stopLoss) {
    annotations.yaxis.push({
      y: Number(analysis.stopLoss),
      borderColor: "#FF4560",
      label: {
        text: "SL",
        style: {
          background: "#FF4560",
          color: "#fff",
        },
      },
    });
  }

  if (analysis?.target1) {
    annotations.yaxis.push({
      y: Number(analysis.target1),
      borderColor: "#FEB019",
      label: {
        text: "TP1",
        style: {
          background: "#FEB019",
          color: "#000",
        },
      },
    });
  }

  if (analysis?.target2) {
    annotations.yaxis.push({
      y: Number(analysis.target2),
      borderColor: "#775DD0",
      label: {
        text: "TP2",
        style: {
          background: "#775DD0",
          color: "#fff",
        },
      },
    });
  }

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      background: "#1e293b",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },

    theme: {
      mode: "dark",
    },

    plotOptions: {
  candlestick: {
    colors: {
      upward: "#00E396",
      downward: "#FF4560",
    },
    wick: {
      useFillColor: true,
    },
  },
},

    xaxis: {
  type: "category",
    labels: {
    style: {
      colors: "#ffffff",
    },
  },
},

    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },

    grid: {
      borderColor: "#334155",
    },

    annotations,
    stroke: {
  width: [1],
},

markers: {
  size: 4,
},
  };
  

  return (
    <div className="rounded-xl bg-slate-900 p-6">
      <h2 className="mb-4 text-3xl font-bold">
        Candlestick Chart
      </h2>

      {analysis?.prediction && (
  <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-800 p-3">
    <div>
      <span className="text-slate-400">AI Prediction</span>

      <h3 className="text-xl font-bold text-cyan-400">
        {analysis.prediction}
      </h3>
    </div>

    <div className="text-right">
      <span className="text-slate-400">
        Confidence
      </span>

      <h3 className="text-2xl font-bold text-green-400">
        {analysis.confidence}%
      </h3>
    </div>
  </div>
)}

      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
}