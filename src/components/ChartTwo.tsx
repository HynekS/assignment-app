import { useEffect, useRef } from "react";
import { Chart, Util } from "@antv/g2";

import { RouterOutputs } from "~/utils/api";
import { COLORS as colors } from "~/constants/colors";

type Data = RouterOutputs["covid"]["getCovidData"]["cumulative"];

const ChartTwo = ({ data }: { data: Data }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!data) return;
    if (!chartRef.current) {
      chartRef.current = new Chart({
        container: "chartTwoContainer",
        autoFit: true,
        height: 500,
      });
    }

    chartRef.current.data(data);

    chartRef.current.coordinate("theta", {
      radius: 0.75,
    });
    chartRef.current.tooltip({
      showMarkers: false,
    });

    chartRef.current
      .interval()
      .adjust("stack")
      .position("value")
      .color("type", Object.values(colors))
      .style({ opacity: 0.4 })
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              matrix: Util.zoom(shape, 1.1),
            };
          },
        },
      })
      .label("type", () => {
        return {
          offset: -30,
          style: {
            fill: "white",
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
          },
          content: (obj) => {
            return obj.type + "\n" + obj.value.toLocaleString();
          },
        };
      });

    chartRef.current.interaction("element-single-selected");

    chartRef.current.render();

    return () => {
      if (chartRef.current) chartRef.current.changeData(data);
    };
  }, [data]);

  return <div id="chartTwoContainer" className="p-8"></div>;
};

export default ChartTwo;
