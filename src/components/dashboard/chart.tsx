import { useState } from "react";
import Chart from "react-apexcharts";

function ChartComp() {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  });

  return (
        <div className="w-4/5 mx-auto ">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
            
          />
        </div>
  );
}

export default ChartComp;