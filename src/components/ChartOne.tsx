import { useEffect, useRef } from "react";
import { Chart } from "@antv/g2";

import { api, RouterOutputs } from "~/utils/api";

//let chart: Chart | null = null;

const ChartOne = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!data) return;
    if (!chartRef.current) {
      chartRef.current = new Chart({
        container: "chartOneContainer",
        autoFit: true,
        height: 500,
        width: 600,
      });
    }

    chartRef.current.data(data);

    chartRef.current.scale({
      England: {
        min: 0,
        max: 200000,
      },
      Wales: {
        min: 0,
        max: 200000,
      },
      Scotland: {
        min: 0,
        max: 200000,
      },
      "Northern Ireland": {
        min: 0,
        max: 200000,
      },
    });

    chartRef.current.legend({
      custom: true,
      items: [
        {
          name: "England",
          value: "England",
          marker: {
            symbol: "line",
            style: { stroke: "#1890ff", lineWidth: 2 },
          },
        },
        {
          name: "Northern Ireland",
          value: "Northern Ireland",
          marker: {
            symbol: "line",
            style: { stroke: "#2fc25b", lineWidth: 2 },
          },
        },
        {
          name: "Scotland",
          value: "Scotland",
          marker: {
            symbol: "line",
            style: { stroke: "#9f925b", lineWidth: 2 },
          },
        },
        {
          name: "Wales",
          value: "Wales",
          marker: {
            symbol: "line",
            style: { stroke: "red", lineWidth: 2 },
          },
        },
      ],
    });

    chartRef.current.line().position("date*England").color("#1890ff");
    chartRef.current.line().position("date*Wales").color("#2fc25b");
    chartRef.current.line().position("date*Scotland").color("#9f925b");
    chartRef.current.line().position("date*Northern Ireland").color("red");

    chartRef.current.removeInteraction("legend-filter");
    chartRef.current.render();

    return () => {
      if (chartRef.current) chartRef.current.changeData(data);
    };
  }, [data]);

  return <div id="chartOneContainer" className="p-8"></div>;
};

export default ChartOne;
