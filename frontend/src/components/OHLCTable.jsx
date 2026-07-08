import { useRef, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaPlay,
  FaFileCsv,
} from "react-icons/fa";

export default function OHLCTable({
  rows,
  setRows,
  setAnalysis,
}) {

  const fileRef = useRef();

  const [loading, setLoading] = useState(false);

  const [timeframe, setTimeframe] = useState("15m");


  // ================= CSV IMPORT =================

  const importCSV = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: (results) => {

        const data = results.data.map((r) => ({

          time: r.Time || r.time || "",

          open: r.Open || r.open || "",

          high: r.High || r.high || "",

          low: r.Low || r.low || "",

          close: r.Close || r.close || "",

          volume: r.Volume || r.volume || "",

        }));

        setRows(data);

      },

    });

  };

  // ================= ADD ROW =================

  const addRow = () => {

    setRows([
      ...rows,
      {
        time: "",
        open: "",
        high: "",
        low: "",
        close: "",
        volume: "",
      },
    ]);

  };

  // ================= DELETE =================

  const removeRow = () => {

    if (rows.length > 1) {

      setRows(rows.slice(0, -1));

    }

  };
  
  const clearTable = () => {
    if (!window.confirm("Are you sure you want to clear all OHLC data?")) {
  return;
}

if (fileRef.current) {
  fileRef.current.value = "";
}
  setRows([
    {
      time: "",
      open: "",
      high: "",
      low: "",
      close: "",
      volume: "",
    },
  ]);

  if (setAnalysis) {
    setAnalysis({
      prediction: "Waiting...",
      confidence: 0,
      reasons: [],
      nextCandle: null,
      entry: null,
      stopLoss: null,
      target1: null,
      target2: null,
    });
  }
};

  // ================= UPDATE CELL =================

  const updateCell = (index, field, value) => {

    const copy = [...rows];

    copy[index][field] = value;

    setRows(copy);

  };

  // ================= ANALYZE =================

  const analyze = async () => {

    try {

      setLoading(true);

      const candles = rows

        .filter(
          (r) =>
            r.open !== "" &&
            r.high !== "" &&
            r.low !== "" &&
            r.close !== ""
        )

        .map((r) => ({

          time: r.time,

          open: Number(r.open),

          high: Number(r.high),

          low: Number(r.low),

          close: Number(r.close),

          volume: Number(r.volume || 0),

        }));

      if (candles.length === 0) {

        alert("Please Enter Candle Data");

        return;

      }

      const response = await axios.post(
  "http://127.0.0.1:8000/analyze/",
  {
    timeframe,
    candles,
  }
);

console.log(response.data);

// AI Analysis panel update karo
if (setAnalysis) {
  setAnalysis(response.data);
}

      console.log(response.data);

      alert("Analysis Completed");

    }

    catch (error) {

      console.error(error);

      if (error.response) {

        alert(error.response.data.detail);

      }

      else {

        alert("Backend Connection Failed");

      }

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="rounded-xl bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">

          OHLC Data

        </h2>

        <select

          value={timeframe}

          onChange={(e) => setTimeframe(e.target.value)}

          className="rounded-lg bg-slate-800 p-2 text-white"

        >

          <option value="15m">15 Minutes</option>

          <option value="30m">30 Minutes</option>

          <option value="1h">1 Hour</option>

          <option value="4h">4 Hours</option>

          <option value="1d">1 Day</option>

          <option value="1w">1 Week</option>

          <option value="1M">1 Month</option>

        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr>

              <th>Time</th>

              <th>Open</th>

              <th>High</th>

              <th>Low</th>

              <th>Close</th>

              <th>Volume</th>

            </tr>

          </thead>

          <tbody>

            {

              rows.map((row,index)=>(

                <tr key={index}>

                  {

                    ["time","open","high","low","close","volume"].map(field=>(

                      <td key={field} className="p-2">

                        <input

                          className="w-full rounded bg-slate-800 p-2 text-white"

                          value={row[field]}

                          onChange={(e)=>updateCell(index,field,e.target.value)}

                        />

                      </td>

                    ))

                  }

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <input

          hidden

          type="file"

          accept=".csv"

          ref={fileRef}

          onChange={importCSV}

        />

        

        <button

          onClick={()=>fileRef.current.click()}

          className="rounded bg-orange-600 px-4 py-2 text-white flex items-center gap-2"

        >

          <FaFileCsv />

          CSV

        </button>

        <button
  onClick={clearTable}
  className="rounded bg-slate-700 px-4 py-2 text-white flex items-center gap-2 hover:bg-slate-600"
>
  Clear
</button>

        <button

          onClick={addRow}

          className="rounded bg-green-600 px-4 py-2 text-white flex items-center gap-2"

        >

          <FaPlus />

          Add

        </button>

        <button

          onClick={removeRow}

          className="rounded bg-red-600 px-4 py-2 text-white flex items-center gap-2"

        >

          <FaTrash />

          Delete

        </button>

        <button

          disabled={loading}

          onClick={analyze}

          className="rounded bg-cyan-600 px-4 py-2 text-white flex items-center gap-2"

        >

          <FaPlay />

          {

            loading

            ?

            "Analyzing..."

            :

            "Analyze"

          }

        </button>

      </div>

    </div>

  );

}