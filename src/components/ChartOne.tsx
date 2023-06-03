import { useEffect, useRef } from "react";
import { Chart } from "@antv/g2";

import type { RouterOutputs } from "~/utils/api";
import { COLORS as colors } from "~/constants/colors";

type Data = RouterOutputs["covid"]["getCovidData"]["byNations"];

const ChartOne = ({ data }: { data: Data }) => {
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
            symbol: "square",
            style: { fill: colors.England },
          },
        },
        {
          name: "Northern Ireland",
          value: "Northern Ireland",
          marker: {
            symbol: "square",
            style: { fill: colors["Northern Ireland"] },
          },
        },
        {
          name: "Scotland",
          value: "Scotland",
          marker: {
            symbol: "square",
            style: { fill: colors.Scotland },
          },
        },
        {
          name: "Wales",
          value: "Wales",
          marker: {
            symbol: "square",
            style: { fill: colors.Wales },
          },
        },
      ],
    });

    chartRef.current.line().position("date*England").color(colors.England);
    chartRef.current.line().position("date*Scotland").color(colors.Scotland);
    chartRef.current
      .line()
      .position("date*Northern Ireland")
      .color(colors["Northern Ireland"]);
    chartRef.current.line().position("date*Wales").color(colors.Wales);

    chartRef.current.removeInteraction("legend-filter");
    chartRef.current.render();

    return () => {
      if (chartRef.current) chartRef.current.changeData(data);
    };
  }, [data]);

  return <div id="chartOneContainer" className="p-8"></div>;
};

export default ChartOne;
